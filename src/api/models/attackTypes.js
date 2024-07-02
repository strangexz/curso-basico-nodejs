const { snakeCaseMappers } = require('objection');
const BaseModel = require('../config/model');

class AttackTypes extends BaseModel {
  /* Convierte los nombres de las columnas de CAMEL CASE a SNAKE CASE */
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  /* El nombre de la tabla es la única propiedad requerida */
  static get tableName() {
    return 'attack_types';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['type'],
      properties: {
        id: { type: 'integer' },
        type: { type: 'string', maxLength: 64 },
        isDeleted: { type: 'boolean' },
      },
    };
  }

  /* Modificadores de relación */
  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select('id', 'type');
      },

      orderByAge(builder) {
        builder.orderBy('id');
      }
    };
  }
}

module.exports = AttackTypes;
