const _ = require('underscore');

const log = require('../config/logger')(module);
const Type = require('../models/type');

/**
 * Este servicio consulta a la base de datos todos los tipos de pokemon
 *
 * @returns un objeto json con 3 atributos:
 * - isOk: valor booleano si es 'true' indica que hubo un error
 *   si es 'false' no hubo error alguno.
 * - data: un arreglo con el resultado de la consulta/transacción
 *   realizada, si ocurrió un error se enviará un valor nulo.
 * - error: en caso de haber un error aquí irá la descripción
 *   de lo contrario se enviará un valor nulo.
 */
const getTypesService = async () => {
  try {
    log.verbose('Inicio servicio getTypesService');

    const data = await Type.query()
      .select('id', 'name', 'id_attack_type', 'created_at', 'updated_at')
      .where('is_deleted', false)
      .withGraphFetched('attackTypes(defaultSelects)');

    log.debug(JSON.stringify(data));
    log.verbose('Fin servicio getTypesService');

    return { isOk: true, data, error: null };
  } catch (e) {
    console.error(e.stack);
    log.error(e.message);
    return { isOk: false, data: null, error: e.message };
  }
};

/**
 * Este servicio consulta a la base de datos de un tipo tipos de pokemon en específico
 * por su identificador
 *
 * @returns un objeto json con 3 atributos:
 * - isOk: valor booleano si es 'true' indica que hubo un error
 *   si es 'false' no hubo error alguno.
 * - data: un arreglo con el resultado de la consulta/transacción
 *   realizada, si ocurrió un error se enviará un valor nulo.
 * - error: en caso de haber un error aquí irá la descripción
 *   de lo contrario se enviará un valor nulo.
 */
const getTypeService = async (id) => {
  try {
    log.verbose('Inicio servicio getTypeService');

    const data = await Type.query()
      .select('id', 'name', 'id_attack_type', 'created_at', 'updated_at')
      .findById(id)
      .where('is_deleted', false)
      .withGraphFetched('attackTypes(defaultSelects)');

    log.debug(JSON.stringify(data));
    log.verbose('Fin servicio getTypeService');

    return { isOk: true, data, error: null };
  } catch (e) {
    console.error(e.stack);
    log.error(e.message);
    return { isOk: false, data: null, error: e.message };
  }
}

module.exports = {
  getTypesService,
  getTypeService
};
