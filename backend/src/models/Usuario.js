const BaseModel = require('./BaseModel');
const bcrypt = require('bcryptjs');

class Usuario extends BaseModel {
  constructor() {
    super('usuarios');
  }

  // Buscar usuario por email
  async findByEmail(email) {
    return await this.findOneBy({ email });
  }

  // Crear usuario con password hasheado
  async create(data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return await super.create(data);
  }

  // Actualizar usuario con password hasheado si se proporciona
  async update(id, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return await super.update(id, data);
  }

  // Verificar password
  async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Actualizar último login
  async updateLastLogin(id) {
    return await this.db(this.tableName)
      .where('id', id)
      .update({
        ultimo_login: this.db.fn.now(),
        updated_at: this.db.fn.now()
      });
  }

  // Obtener usuarios activos
  async findActive() {
    return await this.findBy({ activo: true });
  }

  // Obtener usuarios por rol
  async findByRole(rol) {
    return await this.findBy({ rol });
  }

  // Activar/desactivar usuario
  async toggleActive(id) {
    const usuario = await this.findById(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    return await this.update(id, { activo: !usuario.activo });
  }
}

module.exports = new Usuario();