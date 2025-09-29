const Prestamo = require('../models/Prestamo');
const Cliente = require('../models/Cliente');

class PrestamoController {
  // Obtener todos los préstamos con filtros y paginación
  async index(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      
      const filters = {
        estado: req.query.estado,
        tipo_prestamo: req.query.tipo_prestamo,
        cliente: req.query.cliente,
        numero_prestamo: req.query.numero_prestamo,
        fecha_desde: req.query.fecha_desde,
        fecha_hasta: req.query.fecha_hasta,
        orderBy: req.query.orderBy,
        orderDirection: req.query.orderDirection
      };

      // Filtrar valores undefined
      Object.keys(filters).forEach(key => {
        if (filters[key] === undefined || filters[key] === '') {
          delete filters[key];
        }
      });

      const result = await Prestamo.findAllWithClientes(page, limit, filters);

      res.json({
        success: true,
        message: 'Préstamos obtenidos correctamente',
        ...result
      });

    } catch (error) {
      next(error);
    }
  }

  // Obtener préstamo por ID
  async show(req, res, next) {
    try {
      const { id } = req.params;
      const prestamo = await Prestamo.findWithCliente(id);

      if (!prestamo) {
        return res.status(404).json({
          success: false,
          message: 'Préstamo no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Préstamo obtenido correctamente',
        data: prestamo
      });

    } catch (error) {
      next(error);
    }
  }

  // Crear nuevo préstamo
  async store(req, res, next) {
    try {
      const prestamoData = {
        ...req.body,
        usuario_id: req.user.id,
        fecha_solicitud: new Date().toISOString().split('T')[0]
      };

      // Verificar que el cliente existe
      const cliente = await Cliente.findById(prestamoData.cliente_id);
      if (!cliente) {
        return res.status(404).json({
          success: false,
          message: 'Cliente no encontrado'
        });
      }

      // Si no se proporciona monto_aprobado, usar el monto_solicitado
      if (!prestamoData.monto_aprobado) {
        prestamoData.monto_aprobado = prestamoData.monto_solicitado;
      }

      const prestamo = await Prestamo.create(prestamoData);
      const prestamoCompleto = await Prestamo.findWithCliente(prestamo.id);

      res.status(201).json({
        success: true,
        message: 'Préstamo creado correctamente',
        data: prestamoCompleto
      });

    } catch (error) {
      next(error);
    }
  }

  // Actualizar préstamo
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const prestamoData = req.body;

      const prestamoExistente = await Prestamo.findById(id);
      if (!prestamoExistente) {
        return res.status(404).json({
          success: false,
          message: 'Préstamo no encontrado'
        });
      }

      // Si se cambia el monto, tasa o plazo, recalcular la cuota
      if (prestamoData.monto_aprobado || prestamoData.tasa_interes || prestamoData.plazo_meses) {
        const monto = prestamoData.monto_aprobado || prestamoExistente.monto_aprobado;
        const tasa = prestamoData.tasa_interes || prestamoExistente.tasa_interes;
        const plazo = prestamoData.plazo_meses || prestamoExistente.plazo_meses;
        
        prestamoData.cuota_mensual = Prestamo.calcularCuotaMensual(monto, tasa, plazo);
      }

      const prestamoActualizado = await Prestamo.update(id, prestamoData);
      const prestamoCompleto = await Prestamo.findWithCliente(prestamoActualizado.id);

      res.json({
        success: true,
        message: 'Préstamo actualizado correctamente',
        data: prestamoCompleto
      });

    } catch (error) {
      next(error);
    }
  }

  // Eliminar préstamo
  async destroy(req, res, next) {
    try {
      const { id } = req.params;

      const prestamo = await Prestamo.findById(id);
      if (!prestamo) {
        return res.status(404).json({
          success: false,
          message: 'Préstamo no encontrado'
        });
      }

      // Solo permitir eliminar préstamos en estado pendiente o rechazado
      if (!['pendiente', 'rechazado'].includes(prestamo.estado)) {
        return res.status(400).json({
          success: false,
          message: 'Solo se pueden eliminar préstamos en estado pendiente o rechazado'
        });
      }

      await Prestamo.delete(id);

      res.json({
        success: true,
        message: 'Préstamo eliminado correctamente'
      });

    } catch (error) {
      next(error);
    }
  }

  // Aprobar préstamo
  async aprobar(req, res, next) {
    try {
      const { id } = req.params;
      const { monto_aprobado, observaciones } = req.body;

      const prestamo = await Prestamo.findById(id);
      if (!prestamo) {
        return res.status(404).json({
          success: false,
          message: 'Préstamo no encontrado'
        });
      }

      if (prestamo.estado !== 'pendiente') {
        return res.status(400).json({
          success: false,
          message: 'Solo se pueden aprobar préstamos en estado pendiente'
        });
      }

      const updateData = {
        estado: 'aprobado',
        monto_aprobado: monto_aprobado || prestamo.monto_solicitado,
        fecha_aprobacion: new Date().toISOString().split('T')[0],
        observaciones: observaciones || prestamo.observaciones
      };

      // Recalcular cuota mensual con el monto aprobado
      updateData.cuota_mensual = Prestamo.calcularCuotaMensual(
        updateData.monto_aprobado,
        prestamo.tasa_interes,
        prestamo.plazo_meses
      );

      const prestamoActualizado = await Prestamo.update(id, updateData);
      const prestamoCompleto = await Prestamo.findWithCliente(prestamoActualizado.id);

      res.json({
        success: true,
        message: 'Préstamo aprobado correctamente',
        data: prestamoCompleto
      });

    } catch (error) {
      next(error);
    }
  }

  // Rechazar préstamo
  async rechazar(req, res, next) {
    try {
      const { id } = req.params;
      const { observaciones } = req.body;

      const prestamo = await Prestamo.findById(id);
      if (!prestamo) {
        return res.status(404).json({
          success: false,
          message: 'Préstamo no encontrado'
        });
      }

      if (prestamo.estado !== 'pendiente') {
        return res.status(400).json({
          success: false,
          message: 'Solo se pueden rechazar préstamos en estado pendiente'
        });
      }

      const prestamoActualizado = await Prestamo.update(id, {
        estado: 'rechazado',
        observaciones: observaciones || 'Préstamo rechazado'
      });

      const prestamoCompleto = await Prestamo.findWithCliente(prestamoActualizado.id);

      res.json({
        success: true,
        message: 'Préstamo rechazado correctamente',
        data: prestamoCompleto
      });

    } catch (error) {
      next(error);
    }
  }

  // Desembolsar préstamo
  async desembolsar(req, res, next) {
    try {
      const { id } = req.params;
      const { fecha_desembolso, fecha_vencimiento } = req.body;

      const prestamo = await Prestamo.findById(id);
      if (!prestamo) {
        return res.status(404).json({
          success: false,
          message: 'Préstamo no encontrado'
        });
      }

      if (prestamo.estado !== 'aprobado') {
        return res.status(400).json({
          success: false,
          message: 'Solo se pueden desembolsar préstamos aprobados'
        });
      }

      const updateData = {
        estado: 'activo',
        fecha_desembolso: fecha_desembolso || new Date().toISOString().split('T')[0]
      };

      if (fecha_vencimiento) {
        updateData.fecha_vencimiento = fecha_vencimiento;
      }

      const prestamoActualizado = await Prestamo.update(id, updateData);
      const prestamoCompleto = await Prestamo.findWithCliente(prestamoActualizado.id);

      res.json({
        success: true,
        message: 'Préstamo desembolsado correctamente',
        data: prestamoCompleto
      });

    } catch (error) {
      next(error);
    }
  }

  // Obtener estadísticas generales
  async getEstadisticas(req, res, next) {
    try {
      const estadisticas = await Prestamo.getEstadisticas();

      res.json({
        success: true,
        message: 'Estadísticas obtenidas correctamente',
        data: estadisticas
      });

    } catch (error) {
      next(error);
    }
  }

  // Obtener préstamos próximos a vencer
  async getProximosVencer(req, res, next) {
    try {
      const dias = parseInt(req.query.dias) || 30;
      const prestamos = await Prestamo.findProximosVencer(dias);

      res.json({
        success: true,
        message: 'Préstamos próximos a vencer obtenidos correctamente',
        data: prestamos
      });

    } catch (error) {
      next(error);
    }
  }

  // Calcular cuota de préstamo
  async calcularCuota(req, res, next) {
    try {
      const { monto, tasa_interes, plazo_meses } = req.body;

      if (!monto || !tasa_interes || !plazo_meses) {
        return res.status(400).json({
          success: false,
          message: 'Se requieren monto, tasa de interés y plazo en meses'
        });
      }

      const cuota_mensual = Prestamo.calcularCuotaMensual(monto, tasa_interes, plazo_meses);
      const total_a_pagar = cuota_mensual * plazo_meses;
      const total_intereses = total_a_pagar - monto;

      res.json({
        success: true,
        message: 'Cuota calculada correctamente',
        data: {
          monto,
          tasa_interes,
          plazo_meses,
          cuota_mensual,
          total_a_pagar,
          total_intereses
        }
      });

    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PrestamoController();