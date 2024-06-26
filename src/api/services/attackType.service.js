const _ = require('underscore');

const AttackTypes = require('../models/attackTypes');

/**
 * Este servicio consulta a la base de datos todos los tipos de ataques
 * de pokemon
 *
 * @returns un objeto json con 3 atributos:
 * - isOk: valor booleano si es 'true' indica que hubo un error
 *   si es 'false' no hubo error alguno.
 * - data: un arreglo con el resultado de la consulta/transacción
 *   realizada, si ocurrió un error se enviará un valor nulo.
 * - error: en caso de haber un error aquí irá la descripción
 *   de lo contrario se enviará un valor nulo.
 */
const getAttackTypesService = async () => {
  try {
    console.log('Inicio servicio getAttackTypesService');

    const data = await AttackTypes.query().select('id', 'type', 'created_at', 'updated_at').where('is_deleted', false);

    console.log(data);
    console.log('Fin servicio getAttackTypesService');

    return { isOk: true, data, error: null };
  } catch (e) {
    console.error('=>', e);
    return { isOk: false, data: null, error: e.message };
  }
};

/**
 * Este servicio consulta a la base de datos un tipo de ataque de pokemon
 * en específico por su identificador
 *
 * @param {Integer} id - Identificador del tipo de ataque a obtener
 * @returns un objeto json con 3 atributos:
 * - isOk: valor booleano si es 'true' indica que hubo un error
 *   si es 'false' no hubo error alguno.
 * - data: un arreglo con el resultado de la consulta/transacción
 *   realizada, si ocurrió un error se enviará un valor nulo.
 * - error: en caso de haber un error aquí irá la descripción
 *   de lo contrario se enviará un valor nulo.
 */
const getOneAttackTypeByIdService = async (id) => {
  try {
    console.log('Inicio servicio getOneAttackTypeByIdService');

    const data = await AttackTypes.query()
      .select('id', 'type', 'created_at', 'updated_at')
      .findById(id)
      .where('is_deleted', false);

    console.log(data);
    console.log('Fin servicio getOneAttackTypeByIdService');

    if (_.isUndefined(data)) {
      return { isOk: false, data: {}, error: 'No se encontró el registro' };
    } else {
      return { isOk: true, data, error: null };
    }
  } catch (e) {
    return { isOk: false, data: null, error: e.message };
  }
};

/**
 * Este servicio consulta a la base de datos un tipo de ataque de pokemon
 * en específico por su nombre
 *
 * @param {String} name - Nombre del tipo de ataque a obtener
 * @returns un objeto json con 3 atributos:
 * - isOk: valor booleano si es 'true' indica que hubo un error
 *   si es 'false' no hubo error alguno.
 * - data: un arreglo con el resultado de la consulta/transacción
 *   realizada, si ocurrió un error se enviará un valor nulo.
 * - error: en caso de haber un error aquí irá la descripción
 *   de lo contrario se enviará un valor nulo.
 */
const getOneAttackTypeByNameService = async (name) => {
  try {
    console.log('Inicio servicio getOneAttackTypeByNameService');

    const data = await AttackTypes.query().select('id', 'type', 'created_at', 'updated_at').where('type', name);

    console.log(data);
    console.log('Fin servicio getOneAttackTypeByNameService').where('is_deleted', false);

    if (_.isUndefined(data)) {
      return { isOk: true, data: {}, error: null };
    } else {
      return { isOk: true, data, error: null };
    }
  } catch (e) {
    return { isOk: false, data: null, error: e.message };
  }
};

/**
 * Servicio que registra en la base de datos un nuevo tipo de ataque
 *
 * @param {String} type - Nombre del tipo de ataque
 * @returns un objeto json con 3 atributos:
 * - isOk: valor booleano si es 'true' indica que hubo un error
 *   si es 'false' no hubo error alguno.
 * - data: un arreglo con el resultado de la consulta/transacción
 *   realizada, si ocurrió un error se enviará un valor nulo.
 * - error: en caso de haber un error aquí irá la descripción
 *   de lo contrario se enviará un valor nulo.
 */
const recordNewAttackTypeService = async (type) => {
  try {
    console.log('Inicio servicio recordNewAttackTypeService');

    const registeredRecord = await AttackTypes.query().insert({
      type,
      isDeleted: false,
    });

    console.log('Fin servicio recordNewAttackTypeService');

    if (_.isUndefined(registeredRecord)) {
      return { isOk: true, data: {}, error: null };
    } else {
      return { isOk: true, data: registeredRecord, error: null };
    }
  } catch (e) {
    return { isOk: false, data: null, error: e.message };
  }
};

/**
 * Servicio que actualiza en la base de datos el nombre de un tipo de ataque
 * específico por su identificador
 *
 * @param {Integer} id - Identificador del tipo de ataque
 * @param {String} type - Nuevo nombre del tipo de ataque
 * @returns un objeto json con 3 atributos:
 * - isOk: valor booleano si es 'true' indica que hubo un error
 *   si es 'false' no hubo error alguno.
 * - data: un arreglo con el resultado de la consulta/transacción
 *   realizada, si ocurrió un error se enviará un valor nulo.
 * - error: en caso de haber un error aquí irá la descripción
 *   de lo contrario se enviará un valor nulo.
 */
const updateAttackTypeService = async (id, newName) => {
  try {
    console.log('Inicio servicio updateAttackTypeService');

    const updatedRecord = await AttackTypes.query().patchAndFetchById(id, { type: newName });

    console.log('Fin servicio updateAttackTypeService');

    if (_.isUndefined(updatedRecord)) {
      return { isOk: false, data: {}, error: 'No se encontró el registro' };
    } else {
      return { isOk: true, data: updatedRecord, error: null };
    }
  } catch (e) {
    return { isOk: false, data: null, error: e.message };
  }
};

/**
 * Servicio que actualiza en la base de datos el estado de un tipo de ataque
 * específico por su identificador para aplicar un soft-delete
 *
 * @param {Integer} id - Identificador del tipo de ataque
 * @returns un objeto json con 3 atributos:
 * - isOk: valor booleano si es 'true' indica que hubo un error
 *   si es 'false' no hubo error alguno.
 * - data: un arreglo con el resultado de la consulta/transacción
 *   realizada, si ocurrió un error se enviará un valor nulo.
 * - error: en caso de haber un error aquí irá la descripción
 *   de lo contrario se enviará un valor nulo.
 */
const deleteAttackTypeService = async () => {
  try {
    console.log('Inicio servicio deleteAttackTypeService');

    const deletedRecord = await AttackTypes.query().patchAndFetchById(id, { isDeleted: true });
    console.log('Fin servicio deleteAttackTypeService');

    if (_.isUndefined(deletedRecord)) {
      return { isOk: false, data: {}, error: 'No se encontró el registro' };
    } else {
      return { isOk: true, data: deletedRecord, error: null };
    }
  } catch (e) {
    return { isOk: false, data: null, error: e.message };
  }
};

module.exports = {
  getAttackTypesService,
  getOneAttackTypeByIdService,
  getOneAttackTypeByNameService,
  recordNewAttackTypeService,
  updateAttackTypeService,
  deleteAttackTypeService,
};
