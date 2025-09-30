const express = require('express');
const { body, param, query } = require('express-validator');
const { handleValidation } = require('../middleware/validation');
const { authMiddleware, requireStaff } = require('../middleware/auth');
const PrestamoController = require('../controllers/PrestamoController');

const router = express.Router();

// TEMPORAL: Comentar autenticación para desarrollo
// TODO: Descomentar en producción
// router.use(authMiddleware);
// router.use(requireStaff);

// Validaciones para crear préstamo
const createPrestamoValidation = [
  body('cliente_id')
    .isInt({ min: 1 })
    .withMessage('ID del cliente debe ser un número entero positivo'),
  body('monto_solicitado')
    .isDecimal({ decimal_digits: '0,2' })
    .custom(value => value > 0)
    .withMessage('El monto solicitado debe ser un número positivo'),
  body('monto_aprobado')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .custom(value => value > 0)
    .withMessage('El monto aprobado debe ser un número positivo'),
  body('tasa_interes')
    .isDecimal({ decimal_digits: '0,2' })
    .custom(value => value > 0 && value <= 100)
    .withMessage('La tasa de interés debe estar entre 0 y 100'),
  body('plazo_meses')
    .isInt({ min: 1, max: 600 })
    .withMessage('El plazo debe ser entre 1 y 600 meses'),
  body('tipo_prestamo')
    .isIn(['personal', 'hipotecario', 'vehicular', 'comercial'])
    .withMessage('Tipo de préstamo inválido'),
  body('proposito')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('El propósito no puede exceder 500 caracteres'),
  body('garantia')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('La garantía no puede exceder 255 caracteres'),
  body('comision')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .custom(value => value >= 0)
    .withMessage('La comisión debe ser un número positivo o cero'),
  body('gastos_administrativos')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .custom(value => value >= 0)
    .withMessage('Los gastos administrativos deben ser un número positivo o cero'),
  handleValidation
];

// Validaciones para actualizar préstamo
const updatePrestamoValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID debe ser un número entero positivo'),
  body('monto_solicitado')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .custom(value => value > 0)
    .withMessage('El monto solicitado debe ser un número positivo'),
  body('monto_aprobado')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .custom(value => value > 0)
    .withMessage('El monto aprobado debe ser un número positivo'),
  body('tasa_interes')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .custom(value => value > 0 && value <= 100)
    .withMessage('La tasa de interés debe estar entre 0 y 100'),
  body('plazo_meses')
    .optional()
    .isInt({ min: 1, max: 600 })
    .withMessage('El plazo debe ser entre 1 y 600 meses'),
  body('tipo_prestamo')
    .optional()
    .isIn(['personal', 'hipotecario', 'vehicular', 'comercial'])
    .withMessage('Tipo de préstamo inválido'),
  body('estado')
    .optional()
    .isIn(['pendiente', 'aprobado', 'rechazado', 'activo', 'pagado', 'vencido', 'cancelado'])
    .withMessage('Estado inválido'),
  body('proposito')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('El propósito no puede exceder 500 caracteres'),
  body('garantia')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('La garantía no puede exceder 255 caracteres'),
  body('observaciones')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Las observaciones no pueden exceder 1000 caracteres'),
  body('comision')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .custom(value => value >= 0)
    .withMessage('La comisión debe ser un número positivo o cero'),
  body('gastos_administrativos')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .custom(value => value >= 0)
    .withMessage('Los gastos administrativos deben ser un número positivo o cero'),
  handleValidation
];

// Validaciones para aprobar préstamo
const aprobarPrestamoValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID debe ser un número entero positivo'),
  body('monto_aprobado')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .custom(value => value > 0)
    .withMessage('El monto aprobado debe ser un número positivo'),
  body('observaciones')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Las observaciones no pueden exceder 1000 caracteres'),
  handleValidation
];

// Validaciones para rechazar préstamo
const rechazarPrestamoValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID debe ser un número entero positivo'),
  body('observaciones')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Las observaciones son requeridas y no pueden exceder 1000 caracteres'),
  handleValidation
];

// Validaciones para desembolsar préstamo
const desembolsarPrestamoValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID debe ser un número entero positivo'),
  body('fecha_desembolso')
    .optional()
    .isDate()
    .withMessage('Debe ser una fecha válida'),
  body('fecha_vencimiento')
    .optional()
    .isDate()
    .withMessage('Debe ser una fecha válida'),
  handleValidation
];

// Validaciones para calcular cuota
const calcularCuotaValidation = [
  body('monto')
    .isDecimal({ decimal_digits: '0,2' })
    .custom(value => value > 0)
    .withMessage('El monto debe ser un número positivo'),
  body('tasa_interes')
    .isDecimal({ decimal_digits: '0,2' })
    .custom(value => value > 0 && value <= 100)
    .withMessage('La tasa de interés debe estar entre 0 y 100'),
  body('plazo_meses')
    .isInt({ min: 1, max: 600 })
    .withMessage('El plazo debe ser entre 1 y 600 meses'),
  handleValidation
];

// Validación de parámetros de ID
const paramIdValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID debe ser un número entero positivo'),
  handleValidation
];

// Validaciones para query parameters
const queryValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La página debe ser un número entero positivo'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('El límite debe ser un número entre 1 y 100'),
  query('estado')
    .optional()
    .isIn(['pendiente', 'aprobado', 'rechazado', 'activo', 'pagado', 'vencido', 'cancelado'])
    .withMessage('Estado inválido'),
  query('tipo_prestamo')
    .optional()
    .isIn(['personal', 'hipotecario', 'vehicular', 'comercial'])
    .withMessage('Tipo de préstamo inválido'),
  query('fecha_desde')
    .optional()
    .isDate()
    .withMessage('Fecha desde debe ser una fecha válida'),
  query('fecha_hasta')
    .optional()
    .isDate()
    .withMessage('Fecha hasta debe ser una fecha válida'),
  query('dias')
    .optional()
    .isInt({ min: 1, max: 365 })
    .withMessage('Los días deben ser un número entre 1 y 365'),
  handleValidation
];

// Rutas CRUD básicas
router.get('/', queryValidation, PrestamoController.index);
router.get('/estadisticas', PrestamoController.getEstadisticas);
router.get('/proximos-vencer', queryValidation, PrestamoController.getProximosVencer);
router.get('/:id', paramIdValidation, PrestamoController.show);
router.post('/', createPrestamoValidation, PrestamoController.store);
router.put('/:id', updatePrestamoValidation, PrestamoController.update);
router.delete('/:id', paramIdValidation, PrestamoController.destroy);

// Rutas para acciones específicas de préstamos
router.post('/:id/aprobar', aprobarPrestamoValidation, PrestamoController.aprobar);
router.post('/:id/rechazar', rechazarPrestamoValidation, PrestamoController.rechazar);
router.post('/:id/desembolsar', desembolsarPrestamoValidation, PrestamoController.desembolsar);

// Rutas de utilidad
router.post('/calcular-cuota', calcularCuotaValidation, PrestamoController.calcularCuota);

module.exports = router;