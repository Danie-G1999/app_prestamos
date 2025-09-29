const db = require('../config/database');

class BaseModel {
  constructor(tableName) {
    this.tableName = tableName;
    this.db = db;
  }

  // Obtener todos los registros
  async findAll(columns = '*') {
    return await this.db(this.tableName).select(columns);
  }

  // Obtener registros con paginación
  async findAllPaginated(page = 1, limit = 10, columns = '*') {
    const offset = (page - 1) * limit;
    
    const [results, total] = await Promise.all([
      this.db(this.tableName)
        .select(columns)
        .limit(limit)
        .offset(offset),
      this.db(this.tableName).count('* as count').first()
    ]);

    return {
      data: results,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(total.count),
        pages: Math.ceil(total.count / limit)
      }
    };
  }

  // Obtener un registro por ID
  async findById(id, columns = '*') {
    return await this.db(this.tableName)
      .select(columns)
      .where('id', id)
      .first();
  }

  // Obtener registros por criterio
  async findBy(criteria, columns = '*') {
    return await this.db(this.tableName)
      .select(columns)
      .where(criteria);
  }

  // Obtener un registro por criterio
  async findOneBy(criteria, columns = '*') {
    return await this.db(this.tableName)
      .select(columns)
      .where(criteria)
      .first();
  }

  // Crear un nuevo registro
  async create(data) {
    const [id] = await this.db(this.tableName)
      .insert({
        ...data,
        created_at: this.db.fn.now(),
        updated_at: this.db.fn.now()
      })
      .returning('id');
    
    return await this.findById(id);
  }

  // Actualizar un registro
  async update(id, data) {
    await this.db(this.tableName)
      .where('id', id)
      .update({
        ...data,
        updated_at: this.db.fn.now()
      });
    
    return await this.findById(id);
  }

  // Eliminar un registro
  async delete(id) {
    return await this.db(this.tableName)
      .where('id', id)
      .del();
  }

  // Contar registros
  async count(criteria = {}) {
    const result = await this.db(this.tableName)
      .where(criteria)
      .count('* as count')
      .first();
    
    return parseInt(result.count);
  }

  // Verificar si existe un registro
  async exists(criteria) {
    const count = await this.count(criteria);
    return count > 0;
  }
}

module.exports = BaseModel;