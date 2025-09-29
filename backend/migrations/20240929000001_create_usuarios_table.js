/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('usuarios', function(table) {
    table.increments('id').primary();
    table.string('nombre', 100).notNullable();
    table.string('email', 100).notNullable().unique();
    table.string('password').notNullable();
    table.enum('rol', ['admin', 'empleado']).defaultTo('empleado');
    table.boolean('activo').defaultTo(true);
    table.timestamp('ultimo_login');
    table.timestamps(true, true); // created_at, updated_at
    
    // Índices
    table.index('email');
    table.index('rol');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('usuarios');
};