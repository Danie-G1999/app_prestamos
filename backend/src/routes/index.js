const express = require('express');
const authRoutes = require('./auth');
const clientesRoutes = require('./clientes');
const prestamosRoutes = require('./prestamos');

const router = express.Router();

// Rutas de autenticación
router.use('/auth', authRoutes);

// Rutas de recursos
router.use('/clientes', clientesRoutes);
router.use('/prestamos', prestamosRoutes);

// Ruta de estado de la API
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

module.exports = router;