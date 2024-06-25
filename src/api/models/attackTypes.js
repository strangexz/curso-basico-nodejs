const BaseModel = require('../config/model');

class AttackTypes extends BaseModel {
  /* El nombre de la tabla es la única propiedad requerida */
  static get tableName(){
    return 'attack_types';
  }

  static get idColumn(){
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['type'],
      properties: {
        id: { type: 'integer' },
        type: { type: 'string', maxLength: 64 },
      },
    };
  }
}

module.exports = AttackTypes;
