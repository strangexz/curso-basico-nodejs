const _ = require('underscore');

const AttackTypes = require('../models/attackTypes');

/**
 * Este servicio consulta todos los tipos de ataques de pokemon
 *
 * @returns un objeto json con 3 atributos:
 * - isOk: valor booleano si es 'true' indica que hubo un error
 *   si es 'false' no hubo error alguno.
 * - data: un arreglo con el resultado de la consulta/transacción
 *   realizada, si ocurrió un error se enviará un valor nulo.
 * - error: en caso de haber un error aquí irá la descripción
 *   de lo contrario se enviará un valor nulo.
 */
const getAttackTypes = async () => {
  try {
    console.log('Inicio servicio getAttackTypes');

    const data = await AttackTypes.query();

    console.log(data);
    console.log('Fin servicio getAttackTypes');

    return { isOk: true, data, error: null };
  } catch (e) {
    console.error('=>', e);
    return { isOk: false, data: null, error: e.message };
  }
};

const getOneAttackType = async (id) => {
  try {
    console.log('Inicio servicio getOneAttackType');

    const data = await AttackTypes.query().findById(id);

    console.log(data);
    console.log('Fin servicio getOneAttackType');

    if (_.isUndefined(data)) {
      return { isOk: true, data: {}, error: null };
    } else {
      return { isOk: true, data, error: null };
    }
  } catch (e) {
    return { isOk: false, data: null, error: e.message };
  }
};

module.exports = {
  getAttackTypes,
  getOneAttackType,
};
