/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('documentos', function(table) {
    table.increments('id').primary();
    table.integer('cliente_id').unsigned();
    table.integer('prestamo_id').unsigned();
    table.string('nombre_archivo', 255).notNullable();
    table.string('ruta_archivo', 500).notNullable();
    table.string('tipo_documento', 100).notNullable();
    table.string('mime_type', 100);
    table.integer('tamano_bytes');
    table.text('descripcion');
    table.boolean('obligatorio').defaultTo(false);
    table.boolean('verificado').defaultTo(false);
    table.timestamp('fecha_verificacion');
    table.integer('verificado_por').unsigned();
    table.timestamps(true, true);
    
    // Claves foráneas
    table.foreign('cliente_id').references('id').inTable('clientes').onDelete('CASCADE');
    table.foreign('prestamo_id').references('id').inTable('prestamos').onDelete('CASCADE');
    table.foreign('verificado_por').references('id').inTable('usuarios').onDelete('SET NULL');
    
    // Índices
    table.index('cliente_id');
    table.index('prestamo_id');
    table.index('tipo_documento');
    table.index('verificado');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('documentos');
};