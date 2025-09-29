const express = require('express');
const { body, param, query } = require('express-validator');
const { handleValidation } = require('../middleware/validation');
const { authMiddleware, requireStaff } = require('../middleware/auth');
const ClienteController = require('../controllers/ClienteController');

const router = express.Router();

// Middleware de autenticación para todas las rutas
router.use(authMiddleware);
router.use(requireStaff);

// Validaciones para crear cliente
const createClienteValidation = [
  body('nombre')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  body('apellido')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El apellido debe tener entre 2 y 100 caracteres'),
  body('email')
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail(),
  body('telefono')
    .optional()
    .isMobilePhone('any')
    .withMessage('Debe ser un número de teléfono válido'),
  body('documento_identidad')
    .optional()
    .isLength({ min: 8, max: 20 })
    .withMessage('El documento debe tener entre 8 y 20 caracteres'),
  body('tipo_documento')
    .optional()
    .isIn(['DNI', 'NIE', 'Pasaporte'])
    .withMessage('Tipo de documento inválido'),
  body('fecha_nacimiento')
    .optional()
    .isDate()
    .withMessage('Debe ser una fecha válida'),
  body('ingresos_mensuales')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Los ingresos deben ser un número decimal válido'),
  body('estado_civil')
    .optional()
    .isIn(['soltero', 'casado', 'divorciado', 'viudo'])
    .withMessage('Estado civil inválido'),
  body('estado')
    .optional()
    .isIn(['activo', 'inactivo', 'bloqueado'])
    .withMessage('Estado inválido'),
  handleValidation
];

// Validaciones para actualizar cliente
const updateClienteValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID debe ser un número entero positivo'),
  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  body('apellido')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El apellido debe tener entre 2 y 100 caracteres'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail(),
  body('telefono')
    .optional()
    .isMobilePhone('any')
    .withMessage('Debe ser un número de teléfono válido'),
  body('documento_identidad')
    .optional()
    .isLength({ min: 8, max: 20 })
    .withMessage('El documento debe tener entre 8 y 20 caracteres'),
  body('tipo_documento')
    .optional()
    .isIn(['DNI', 'NIE', 'Pasaporte'])
    .withMessage('Tipo de documento inválido'),
  body('fecha_nacimiento')
    .optional()
    .isDate()
    .withMessage('Debe ser una fecha válida'),
  body('ingresos_mensuales')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Los ingresos deben ser un número decimal válido'),
  body('estado_civil')
    .optional()
    .isIn(['soltero', 'casado', 'divorciado', 'viudo'])
    .withMessage('Estado civil inválido'),
  body('estado')
    .optional()
    .isIn(['activo', 'inactivo', 'bloqueado'])
    .withMessage('Estado inválido'),
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
    .isIn(['activo', 'inactivo', 'bloqueado'])
    .withMessage('Estado inválido'),
  handleValidation
];

// Rutas CRUD
router.get('/', queryValidation, ClienteController.index);
router.get('/activos', ClienteController.getActivos);
router.get('/:id', paramIdValidation, ClienteController.show);
router.get('/:id/prestamos', paramIdValidation, ClienteController.showWithPrestamos);
router.get('/:id/estadisticas', paramIdValidation, ClienteController.getEstadisticas);
router.post('/', createClienteValidation, ClienteController.store);
router.put('/:id', updateClienteValidation, ClienteController.update);
router.delete('/:id', paramIdValidation, ClienteController.destroy);

module.exports = router;