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
const getOperations = (methods) => {
  try {
    log.verbose('Inicio servicio getOperations');

    const operations = require('../../data/data.json');
    let data;

    if (methods.length > 0) {
      data = {};
      for (const method of methods) {
        data[method] = operations[method];
      }
    } else {
      data = operations;
    }

    log.debug(JSON.stringify(data));
    log.verbose('Fin servicio getOperations');

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
const getOperation = (method) => {
  try {
    log.verbose('Inicio servicio getOperation');

    const operations = require('../../data/data.json');

    const data = {};
    data[method] = operations[method];

    log.debug(JSON.stringify(data));
    log.verbose('Fin servicio getOperation');

    return { isOk: true, data, error: null };
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
const postAddition = (number1, number2) => {
  try {
    log.verbose('Inicio servicio postAddition');

    const total = number1 + number2;

    log.verbose('Fin servicio postAddition');

    return { isOk: true, data: { number1, number2, total }, error: null };
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
const putMultiply = (number1, number2) => {
  try {
    log.verbose('Inicio servicio putMultiply');

    const product = number1 * number2;

    log.verbose('Fin servicio putMultiply');

    return { isOk: true, data: { number1, number2, product }, error: null };
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
const deleteDivision = (number1, number2, getRemainder) => {
  try {
    log.verbose('Inicio servicio deleteDivision');

    let remainder;

    const quotient = number1 / number2;

    log.verbose('Fin servicio deleteDivision');

    return { isOk: true, data: { number1, number2, quotient }, error: null };
  } catch (e) {
    console.error(e.stack);
    log.error(e.message);
    return { isOk: false, data: null, error: e.message };
  }
};

module.exports = {
  getOperations,
  getOperation,
  postAddition,
  putMultiply,
  deleteDivision,
};
