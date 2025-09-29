require('dotenv').config();
const app = require('./app');
const config = require('./config');

// Manejar errores no capturados
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

// Iniciar servidor
const server = app.listen(config.port, () => {
  console.log(`🚀 Servidor iniciado en http://localhost:${config.port}`);
  console.log(`📊 Entorno: ${config.nodeEnv}`);
  console.log(`🔐 CORS configurado para: ${config.cors.origin}`);
  console.log('📝 API Endpoints disponibles:');
  console.log('   GET  / - Información de la API');
  console.log('   GET  /api/health - Estado de la API');
  console.log('   POST /api/auth/login - Autenticación');
  console.log('   GET  /api/clientes - Gestión de clientes');
  console.log('   GET  /api/prestamos - Gestión de préstamos');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM recibido, cerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT recibido, cerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});