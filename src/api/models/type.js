const { snakeCaseMappers } = require('objection');
const BaseModel = require('../config/model');

class Type extends BaseModel {
  /* Convierte los nombres de las columnas de CAMEL CASE a SNAKE CASE */
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  /* El nombre de la tabla es la única propiedad requerida */
  static get tableName() {
    return 'types';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'id_attack_type', 'is_deleted'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', maxLength: 64 },
        idAttackType: { type: 'integer' },
        isDeleted: { type: 'boolean' },
      },
    };
  }

  /* Este objeto define las relaciones con otros modelos */
  static get relationMappings() {
    /* Una forma de evitar los "require loops" es importando los modelos aqui */
    const AttackTypesModel = require('../models/attackTypes');

    return {
      attackTypes: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: AttackTypesModel,
        join: {
          from: 'types.id_attack_type',
          to: 'attack_types.id',
        },
      },
    };
  }
}

module.exports = Type;
