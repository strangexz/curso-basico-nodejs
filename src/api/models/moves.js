const { snakeCaseMappers } = require('objection');

const BadeModel = require('../config/model');

class Move extends BadeModel {
   /* Convierte los nombres de las columnas de CAMEL CASE a SNAKE CASE */
   static get columnNameMappers() {
    return snakeCaseMappers();
  }

  /* El nombre de la tabla es la única propiedad requerida */
  static get tableName() {
    return 'moves';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'description', 'is_deleted'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', maxLength: 64 },
        description: { type: 'string', maxLength: 255 },
        power: { type: 'integer' },
        pp: { type: 'integer' },
        idType: { type: 'integer' },
        priority: { type: 'integer' },
        isDeleted: { type: 'boolean' },
      },
    };
  }

  /* Este objeto define las relaciones con otros modelos */
  static get relationMapping(){
    /* Una forma de evitar los "require loops" es importando los modelos aqui */
    // const  = require('../config/');

  }
}

module.exports = AttackTypes;
