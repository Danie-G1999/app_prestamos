/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('clientes', function(table) {
    table.increments('id').primary();
    table.string('nombre', 100).notNullable();
    table.string('apellido', 100).notNullable();
    table.string('email', 100).notNullable().unique();
    table.string('telefono', 20);
    table.string('direccion', 255);
    table.string('ciudad', 50);
    table.string('codigo_postal', 10);
    table.string('pais', 50).defaultTo('Colombia');
    table.date('fecha_nacimiento');
    table.string('documento_identidad', 20).unique();
    table.enum('tipo_documento', ['DNI', 'NIE', 'Pasaporte']).defaultTo('DNI');
    table.decimal('ingresos_mensuales', 10, 2);
    table.string('ocupacion', 100);
    table.enum('estado_civil', ['soltero', 'casado', 'divorciado', 'viudo']).defaultTo('soltero');
    table.enum('estado', ['activo', 'inactivo', 'bloqueado']).defaultTo('activo');
    table.text('notas');
    table.timestamps(true, true);
    
    // Índices
    table.index('email');
    table.index('documento_identidad');
    table.index('estado');
    table.index(['nombre', 'apellido']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('clientes');
};