const _ = require('underscore');
const log = require('../config/logger')(module);

/**
 * Método que tiene como función devolver los datos de un archivo JSON
 *
 * @param {Array} methods - arreglo de una cadena de caracteres con los métodos a obtener
 * @returns {JSON} objeto JSON con 3 atributos:
 * - isOk: booleano que indica si la transacción es exitosa
 * - data: objeto con los datos solicitados
 * - error: descripción del error si es que existe
 */
const getOperationsService = (methods) => {
  try {
    log.verbose('Inicio servicio getOperationsService');

    const operations = require('../../data/data.json');
    let data;

    if (methods.length > 0) {
      data = {};
      for (const method of methods) {
        if (_.isUndefined(operations[method])) {
          return { isOk: false, data: null, error: `El elemento [${method}] no esta definido` };
        }
        data[method] = operations[method];
      }
    } else {
      data = operations;
    }

    log.debug(JSON.stringify(data));
    log.verbose('Fin servicio getOperationsService');

    return { isOk: true, data, error: null };
  } catch (e) {
    console.error(e.stack);
    log.error(e.message);
    return { isOk: false, data: null, error: e.message };
  }
};

/**
 * Método que tiene como función devolver un registro en específico del archivo JSON
 *
 * @param {String} method - Método web a obtener
 * @returns {JSON} objeto JSON con 3 atributos:
 * - isOk: booleano que indica si la transacción es exitosa
 * - data: objeto con los datos solicitados
 * - error: descripción del error si es que existe
 */
const getOperationService = (method) => {
  try {
    log.verbose('Inicio servicio getOperationService');

    const operations = require('../../data/data.json');

    const data = {};
    data[method] = operations[method];

    log.debug(JSON.stringify(data));
    log.verbose('Fin servicio getOperationService');

    if (_.isUndefined(operations[method])) {
      return { isOk: false, data: null, error: `El elemento [${method}] no esta definido` };
    } else {
      return { isOk: true, data, error: null };
    }
  } catch (e) {
    console.error(e.stack);
    log.error(e.message);
    return { isOk: false, data: null, error: e.message };
  }
};

/**
 * Suma de numeros
 *
 * Método que tiene como función sumar 2 números y devolver
 * el total
 *
 * @param {Number} number1 - Numero 1 a sumar
 * @param {Number} number2 - Numero 2 a sumar
 * @returns {JSON} objeto JSON con 3 atributos:
 * - isOk: booleano que indica si la transacción es exitosa
 * - data: objeto con los datos solicitados
 * - error: descripción del error si es que existe
 */
const postAdditionService = (number1, number2) => {
  try {
    log.verbose('Inicio servicio postAdditionService');

    const total = parseInt(number1) + parseInt(number2);

    log.verbose('Fin servicio postAdditionService');

    if (_.isNaN(total)) {
      return { isOk: false, data: { number1, number2, total }, error: 'El resultado de la suma debe ser numérico' };
    } else {
      return { isOk: true, data: { number1, number2, total }, error: null };
    }
  } catch (e) {
    console.error(e.stack);
    log.error(e.message);
    return { isOk: false, data: null, error: e.message };
  }
};

/**
 * Producto de dos numeros
 *
 * Método que tiene como función multiplicar 2 números y devolver
 * el producto
 *
 * @param {Number} number1 - Numero 1 a sumar
 * @param {Number} number2 - Numero 2 a sumar
 * @returns {JSON} objeto JSON con 3 atributos:
 * - isOk: booleano que indica si la transacción es exitosa
 * - data: objeto con los datos solicitados
 * - error: descripción del error si es que existe
 */
const putMultiplyService = (number1, number2) => {
  try {
    log.verbose('Inicio servicio putMultiplyService');

    const product = parseInt(number1) * parseInt(number2);

    log.verbose('Fin servicio putMultiplyService');

    if (_.isNaN(product)) {
      return { isOk: false, data: { number1, number2, product }, error: 'El resultado del producto debe ser numérico' };
    } else {
      return { isOk: true, data: { number1, number2, product }, error: null };
    }
  } catch (e) {
    console.error(e.stack);
    log.error(e.message);
    return { isOk: false, data: null, error: e.message };
  }
};

/**
 * Divide 2 números
 *
 * Método que tiene como función dividir 2 números y devolver
 * el cociente
 *
 * @param {Number} number1 - Dividendo
 * @param {Number} number2 - Divisor
 * @param {Boolean} getRemainder - necesita el residuo en la respuesta?
 * @returns {JSON} objeto JSON con 3 atributos:
 * - isOk: booleano que indica si la transacción es exitosa
 * - data: objeto con los datos solicitados
 * - error: descripción del error si es que existe
 */
const deleteDivisionService = (number1, number2, getRemainder) => {
  try {
    log.verbose('Inicio servicio deleteDivisionService');

    const quotient = parseInt(number1) / parseInt(number2);
    const remainder = parseInt(number1) % parseInt(number2);

    log.verbose('Fin servicio deleteDivisionService');

    if (getRemainder === false && quotient === Infinity) {
      return { isOk: false, data: { number1, number2, quotient }, error: 'El divisor no puede ser 0' };
    }

    if (getRemainder === false && _.isNaN(quotient)) {
      return {
        isOk: false,
        data: { number1, number2, quotient },
        error: 'El cociente de la división debe ser numérico',
      };
    }

    if (getRemainder === true && _.isNaN(remainder)) {
      return {
        isOk: false,
        data: { number1, number2, remainder },
        error: 'El residuo de la división debe ser numérico',
      };
    }

    return getRemainder === false
      ? { isOk: true, data: { number1, number2, quotient }, error: null }
      : { isOk: true, data: { number1, number2, remainder }, error: null };
  } catch (e) {
    console.error(e.stack);
    log.error(e.message);
    return { isOk: false, data: null, error: e.message };
  }
};

module.exports = {
  getOperationsService,
  getOperationService,
  postAdditionService,
  putMultiplyService,
  deleteDivisionService,
};
