const bcrypt = require('bcryptjs');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Eliminar datos existentes
  await knex('usuarios').del();
  
  // Hash de la contraseña
  const passwordHash = await bcrypt.hash('admin123', 10);
  
  // Insertar usuarios de prueba
  await knex('usuarios').insert([
    {
      id: 1,
      nombre: 'Administrador Principal',
      email: 'admin@prestafacil.com',
      password: passwordHash,
      rol: 'admin',
      activo: true,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 2,
      nombre: 'Juan Daniel Guzman',
      email: 'juan.guzman@prestafacil.com',
      password: await bcrypt.hash('juan123', 10),
      rol: 'empleado',
      activo: true,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    }
  ]);
};