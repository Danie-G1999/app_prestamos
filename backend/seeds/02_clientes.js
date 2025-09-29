/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Eliminar datos existentes
  await knex('clientes').del();
  
  // Insertar clientes de prueba
  await knex('clientes').insert([
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez García',
      email: 'juan.perez@email.com',
      telefono: '+34 666 123 456',
      direccion: 'Calle Mayor, 123',
      ciudad: 'Madrid',
      codigo_postal: '28001',
      pais: 'España',
      fecha_nacimiento: '1985-03-15',
      documento_identidad: '12345678A',
      tipo_documento: 'DNI',
      ingresos_mensuales: 3500.00,
      ocupacion: 'Ingeniero de Software',
      estado_civil: 'casado',
      estado: 'activo',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 2,
      nombre: 'María',
      apellido: 'García López',
      email: 'maria.garcia@email.com',
      telefono: '+34 666 987 654',
      direccion: 'Avenida de la Paz, 45',
      ciudad: 'Barcelona',
      codigo_postal: '08001',
      pais: 'España',
      fecha_nacimiento: '1990-07-22',
      documento_identidad: '87654321B',
      tipo_documento: 'DNI',
      ingresos_mensuales: 2800.00,
      ocupacion: 'Diseñadora Gráfica',
      estado_civil: 'soltero',
      estado: 'activo',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 3,
      nombre: 'Carlos',
      apellido: 'López Martín',
      email: 'carlos.lopez@email.com',
      telefono: '+34 666 555 333',
      direccion: 'Plaza Central, 8',
      ciudad: 'Valencia',
      codigo_postal: '46001',
      pais: 'España',
      fecha_nacimiento: '1978-12-10',
      documento_identidad: '11223344C',
      tipo_documento: 'DNI',
      ingresos_mensuales: 4200.00,
      ocupacion: 'Gerente de Ventas',
      estado_civil: 'divorciado',
      estado: 'activo',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 4,
      nombre: 'Ana',
      apellido: 'Rodríguez Silva',
      email: 'ana.rodriguez@email.com',
      telefono: '+34 666 777 888',
      direccion: 'Calle de la Luna, 67',
      ciudad: 'Sevilla',
      codigo_postal: '41001',
      pais: 'España',
      fecha_nacimiento: '1992-05-18',
      documento_identidad: '99887766D',
      tipo_documento: 'DNI',
      ingresos_mensuales: 2200.00,
      ocupacion: 'Profesora',
      estado_civil: 'soltero',
      estado: 'activo',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: 5,
      nombre: 'Roberto',
      apellido: 'Silva Fernández',
      email: 'roberto.silva@email.com',
      telefono: '+34 666 111 222',
      direccion: 'Paseo del Río, 234',
      ciudad: 'Bilbao',
      codigo_postal: '48001',
      pais: 'España',
      fecha_nacimiento: '1987-09-03',
      documento_identidad: '55443322E',
      tipo_documento: 'DNI',
      ingresos_mensuales: 3800.00,
      ocupacion: 'Arquitecto',
      estado_civil: 'casado',
      estado: 'activo',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    }
  ]);
};