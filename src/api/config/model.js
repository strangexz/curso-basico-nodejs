const { Model } = require('objection');
const path = require('path');

const knex = require('../config/database');

Model.knex(knex);

class BaseModel extends Model {
  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  static get modelPaths() {
    return [path.resolve('src/models')];
  }
}

module.exports = BaseModel;
