const express = require('express');
const { body } = require('express-validator');
const { handleValidation } = require('../middleware/validation');
const { authMiddleware } = require('../middleware/auth');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

// Validaciones para login
const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  handleValidation
];

// Validaciones para cambio de password
const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('La contraseña actual es requerida'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('La nueva contraseña debe tener al menos 6 caracteres'),
  handleValidation
];

// Validaciones para actualizar perfil
const updateProfileValidation = [
  body('nombre')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  body('email')
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail(),
  handleValidation
];

// Rutas públicas
router.post('/login', loginValidation, AuthController.login);

// Rutas protegidas
router.use(authMiddleware);
router.get('/verify', AuthController.verify);
router.post('/change-password', changePasswordValidation, AuthController.changePassword);
router.put('/profile', updateProfileValidation, AuthController.updateProfile);
router.post('/logout', AuthController.logout);

module.exports = router;