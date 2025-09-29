const BaseModel = require('./BaseModel');

class Cliente extends BaseModel {
  constructor() {
    super('clientes');
  }

  // Buscar cliente por email
  async findByEmail(email) {
    return await this.findOneBy({ email });
  }

  // Buscar cliente por documento de identidad
  async findByDocumento(documento_identidad) {
    return await this.findOneBy({ documento_identidad });
  }

  // Buscar clientes activos
  async findActive() {
    return await this.findBy({ estado: 'activo' });
  }

  // Buscar clientes por estado
  async findByEstado(estado) {
    return await this.findBy({ estado });
  }

  // Buscar clientes con filtros
  async findWithFilters(filters = {}) {
    let query = this.db(this.tableName);

    // Filtro por nombre (búsqueda parcial)
    if (filters.nombre) {
      query = query.where(function() {
        this.where('nombre', 'ilike', `%${filters.nombre}%`)
            .orWhere('apellido', 'ilike', `%${filters.nombre}%`);
      });
    }

    // Filtro por email
    if (filters.email) {
      query = query.where('email', 'ilike', `%${filters.email}%`);
    }

    // Filtro por teléfono
    if (filters.telefono) {
      query = query.where('telefono', 'like', `%${filters.telefono}%`);
    }

    // Filtro por estado
    if (filters.estado) {
      query = query.where('estado', filters.estado);
    }

    // Filtro por ciudad
    if (filters.ciudad) {
      query = query.where('ciudad', 'ilike', `%${filters.ciudad}%`);
    }

    // Ordenamiento
    const orderBy = filters.orderBy || 'created_at';
    const orderDirection = filters.orderDirection || 'desc';
    query = query.orderBy(orderBy, orderDirection);

    return await query;
  }

  // Obtener cliente con sus préstamos
  async findWithPrestamos(id) {
    const cliente = await this.findById(id);
    if (!cliente) return null;

    const prestamos = await this.db('prestamos')
      .where('cliente_id', id)
      .select('*');

    return {
      ...cliente,
      prestamos
    };
  }

  // Obtener estadísticas del cliente
  async getEstadisticas(id) {
    const [prestamos, pagos] = await Promise.all([
      this.db('prestamos')
        .where('cliente_id', id)
        .select(
          this.db.raw('COUNT(*) as total_prestamos'),
          this.db.raw('SUM(monto_aprobado) as monto_total_prestado'),
          this.db.raw('COUNT(CASE WHEN estado = \'activo\' THEN 1 END) as prestamos_activos'),
          this.db.raw('COUNT(CASE WHEN estado = \'pagado\' THEN 1 END) as prestamos_pagados')
        )
        .first(),
      
      this.db('pagos')
        .join('prestamos', 'pagos.prestamo_id', 'prestamos.id')
        .where('prestamos.cliente_id', id)
        .select(
          this.db.raw('COUNT(*) as total_pagos'),
          this.db.raw('SUM(monto_pagado) as monto_total_pagado'),
          this.db.raw('COUNT(CASE WHEN pagos.estado = \'vencido\' THEN 1 END) as pagos_vencidos')
        )
        .first()
    ]);

    return {
      prestamos: {
        total: parseInt(prestamos.total_prestamos) || 0,
        activos: parseInt(prestamos.prestamos_activos) || 0,
        pagados: parseInt(prestamos.prestamos_pagados) || 0,
        monto_total: parseFloat(prestamos.monto_total_prestado) || 0
      },
      pagos: {
        total: parseInt(pagos.total_pagos) || 0,
        vencidos: parseInt(pagos.pagos_vencidos) || 0,
        monto_total_pagado: parseFloat(pagos.monto_total_pagado) || 0
      }
    };
  }

  // Verificar si el email ya existe (excluyendo un ID específico)
  async emailExists(email, excludeId = null) {
    let query = this.db(this.tableName).where('email', email);
    
    if (excludeId) {
      query = query.where('id', '!=', excludeId);
    }
    
    const count = await query.count('* as count').first();
    return parseInt(count.count) > 0;
  }

  // Verificar si el documento ya existe (excluyendo un ID específico)
  async documentoExists(documento_identidad, excludeId = null) {
    let query = this.db(this.tableName).where('documento_identidad', documento_identidad);
    
    if (excludeId) {
      query = query.where('id', '!=', excludeId);
    }
    
    const count = await query.count('* as count').first();
    return parseInt(count.count) > 0;
  }
}

module.exports = new Cliente();