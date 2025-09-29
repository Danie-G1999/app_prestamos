/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('pagos', function(table) {
    table.increments('id').primary();
    table.integer('prestamo_id').unsigned().notNullable();
    table.string('numero_pago', 20).unique().notNullable();
    table.integer('numero_cuota').notNullable();
    table.decimal('monto_cuota', 10, 2).notNullable();
    table.decimal('monto_pagado', 10, 2).notNullable();
    table.decimal('monto_capital', 10, 2).notNullable();
    table.decimal('monto_interes', 10, 2).notNullable();
    table.decimal('monto_mora', 10, 2).defaultTo(0);
    table.date('fecha_vencimiento').notNullable();
    table.date('fecha_pago');
    table.enum('estado', ['pendiente', 'pagado', 'vencido', 'parcial']).defaultTo('pendiente');
    table.enum('metodo_pago', ['efectivo', 'transferencia', 'cheque', 'tarjeta']).defaultTo('efectivo');
    table.string('referencia_pago', 100);
    table.text('observaciones');
    table.timestamps(true, true);
    
    // Clave foránea
    table.foreign('prestamo_id').references('id').inTable('prestamos').onDelete('CASCADE');
    
    // Índices
    table.index('prestamo_id');
    table.index('numero_pago');
    table.index('estado');
    table.index('fecha_vencimiento');
    table.index('fecha_pago');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('pagos');
};