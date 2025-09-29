/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('prestamos', function(table) {
    table.increments('id').primary();
    table.integer('cliente_id').unsigned().notNullable();
    table.integer('usuario_id').unsigned().notNullable(); // Quien creó el préstamo
    table.string('numero_prestamo', 20).unique().notNullable();
    table.decimal('monto_solicitado', 12, 2).notNullable();
    table.decimal('monto_aprobado', 12, 2);
    table.decimal('tasa_interes', 5, 2).notNullable(); // Porcentaje anual
    table.integer('plazo_meses').notNullable();
    table.decimal('cuota_mensual', 10, 2);
    table.enum('tipo_prestamo', ['personal', 'hipotecario', 'vehicular', 'comercial']).notNullable();
    table.enum('estado', ['pendiente', 'aprobado', 'rechazado', 'activo', 'pagado', 'vencido', 'cancelado']).defaultTo('pendiente');
    table.date('fecha_solicitud').notNullable();
    table.date('fecha_aprobacion');
    table.date('fecha_desembolso');
    table.date('fecha_vencimiento');
    table.string('garantia', 255);
    table.text('proposito');
    table.text('observaciones');
    table.decimal('comision', 8, 2).defaultTo(0);
    table.decimal('gastos_administrativos', 8, 2).defaultTo(0);
    table.timestamps(true, true);
    
    // Claves foráneas
    table.foreign('cliente_id').references('id').inTable('clientes').onDelete('RESTRICT');
    table.foreign('usuario_id').references('id').inTable('usuarios').onDelete('RESTRICT');
    
    // Índices
    table.index('cliente_id');
    table.index('usuario_id');
    table.index('numero_prestamo');
    table.index('estado');
    table.index('tipo_prestamo');
    table.index('fecha_solicitud');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('prestamos');
};