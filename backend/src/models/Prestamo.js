const BaseModel = require('./BaseModel');

class Prestamo extends BaseModel {
  constructor() {
    super('prestamos');
  }

  // Obtener préstamo con información del cliente
  async findWithCliente(id) {
    return await this.db(this.tableName)
      .select(
        'prestamos.*',
        'clientes.nombre',
        'clientes.apellido',
        'clientes.email',
        'clientes.telefono'
      )
      .join('clientes', 'prestamos.cliente_id', 'clientes.id')
      .where('prestamos.id', id)
      .first();
  }

  // Obtener préstamos con información de clientes (con paginación)
  async findAllWithClientes(page = 1, limit = 10, filters = {}) {
    const offset = (page - 1) * limit;
    
    let query = this.db(this.tableName)
      .select(
        'prestamos.*',
        'clientes.nombre',
        'clientes.apellido',
        'clientes.email',
        'clientes.telefono',
        'usuarios.nombre as usuario_nombre'
      )
      .join('clientes', 'prestamos.cliente_id', 'clientes.id')
      .join('usuarios', 'prestamos.usuario_id', 'usuarios.id');

    // Aplicar filtros
    if (filters.estado) {
      query = query.where('prestamos.estado', filters.estado);
    }
    
    if (filters.tipo_prestamo) {
      query = query.where('prestamos.tipo_prestamo', filters.tipo_prestamo);
    }
    
    if (filters.cliente) {
      query = query.where(function() {
        this.where('clientes.nombre', 'ilike', `%${filters.cliente}%`)
            .orWhere('clientes.apellido', 'ilike', `%${filters.cliente}%`);
      });
    }
    
    if (filters.numero_prestamo) {
      query = query.where('prestamos.numero_prestamo', 'ilike', `%${filters.numero_prestamo}%`);
    }

    if (filters.fecha_desde) {
      query = query.where('prestamos.fecha_solicitud', '>=', filters.fecha_desde);
    }

    if (filters.fecha_hasta) {
      query = query.where('prestamos.fecha_solicitud', '<=', filters.fecha_hasta);
    }

    // Ordenamiento
    const orderBy = filters.orderBy || 'prestamos.created_at';
    const orderDirection = filters.orderDirection || 'desc';
    query = query.orderBy(orderBy, orderDirection);

    // Ejecutar consultas
    const [results, total] = await Promise.all([
      query.clone().limit(limit).offset(offset),
      query.clone().count('prestamos.id as count').first()
    ]);

    return {
      data: results,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(total.count),
        pages: Math.ceil(total.count / limit)
      }
    };
  }

  // Obtener préstamos por cliente
  async findByCliente(clienteId) {
    return await this.findBy({ cliente_id: clienteId });
  }

  // Obtener préstamos por estado
  async findByEstado(estado) {
    return await this.findBy({ estado });
  }

  // Obtener préstamos por tipo
  async findByTipo(tipo) {
    return await this.findBy({ tipo_prestamo: tipo });
  }

  // Generar número de préstamo único
  async generateNumero() {
    const año = new Date().getFullYear();
    const prefix = `PR-${año}-`;
    
    // Obtener el último número del año
    const ultimo = await this.db(this.tableName)
      .where('numero_prestamo', 'like', `${prefix}%`)
      .orderBy('numero_prestamo', 'desc')
      .first();

    let numero = 1;
    if (ultimo) {
      const ultimoNumero = ultimo.numero_prestamo.split('-')[2];
      numero = parseInt(ultimoNumero) + 1;
    }

    return `${prefix}${numero.toString().padStart(3, '0')}`;
  }

  // Crear préstamo con número automático
  async create(data) {
    if (!data.numero_prestamo) {
      data.numero_prestamo = await this.generateNumero();
    }
    
    // Calcular cuota mensual si no se proporciona
    if (!data.cuota_mensual && data.monto_aprobado && data.tasa_interes && data.plazo_meses) {
      data.cuota_mensual = this.calcularCuotaMensual(
        data.monto_aprobado,
        data.tasa_interes,
        data.plazo_meses
      );
    }

    return await super.create(data);
  }

  // Calcular cuota mensual usando fórmula de amortización francesa
  calcularCuotaMensual(monto, tasaAnual, plazoMeses) {
    const tasaMensual = tasaAnual / 100 / 12;
    const cuota = monto * (tasaMensual * Math.pow(1 + tasaMensual, plazoMeses)) / 
                  (Math.pow(1 + tasaMensual, plazoMeses) - 1);
    return Math.round(cuota * 100) / 100;
  }

  // Obtener estadísticas generales
  async getEstadisticas() {
    const stats = await this.db(this.tableName)
      .select(
        this.db.raw('COUNT(*) as total_prestamos'),
        this.db.raw('SUM(monto_aprobado) as monto_total'),
        this.db.raw('AVG(tasa_interes) as tasa_promedio'),
        this.db.raw('COUNT(CASE WHEN estado = \'activo\' THEN 1 END) as prestamos_activos'),
        this.db.raw('COUNT(CASE WHEN estado = \'pendiente\' THEN 1 END) as prestamos_pendientes'),
        this.db.raw('COUNT(CASE WHEN estado = \'pagado\' THEN 1 END) as prestamos_pagados'),
        this.db.raw('COUNT(CASE WHEN estado = \'vencido\' THEN 1 END) as prestamos_vencidos')
      )
      .first();

    return {
      total_prestamos: parseInt(stats.total_prestamos) || 0,
      monto_total: parseFloat(stats.monto_total) || 0,
      tasa_promedio: parseFloat(stats.tasa_promedio) || 0,
      prestamos_activos: parseInt(stats.prestamos_activos) || 0,
      prestamos_pendientes: parseInt(stats.prestamos_pendientes) || 0,
      prestamos_pagados: parseInt(stats.prestamos_pagados) || 0,
      prestamos_vencidos: parseInt(stats.prestamos_vencidos) || 0
    };
  }

  // Obtener préstamos próximos a vencer
  async findProximosVencer(dias = 30) {
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() + dias);

    return await this.db(this.tableName)
      .select(
        'prestamos.*',
        'clientes.nombre',
        'clientes.apellido',
        'clientes.email',
        'clientes.telefono'
      )
      .join('clientes', 'prestamos.cliente_id', 'clientes.id')
      .where('prestamos.estado', 'activo')
      .where('prestamos.fecha_vencimiento', '<=', fechaLimite)
      .orderBy('prestamos.fecha_vencimiento', 'asc');
  }
}

module.exports = new Prestamo();