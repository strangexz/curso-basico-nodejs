/**
 * Obtención de operaciones
 *
 * Método que tiene como función devolver los datos de un
 * archivo JSON
 *
 * @returns {JSON} objeto JSON con los datos a devolver
 */
const getOperations = (methods) => {
  try {
    console.log('Inicio servicio getOperations');

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

    console.log(data);
    console.log('Fin servicio getOperations');

    return { isOk: true, data, error: null };
  } catch (e) {
    console.error('=>', e);
    return { isOk: false, data: null, error: e.message };
  }
};

/**
 *
 * @param {*} method
 * @returns
 */
const getOperation = (method) => {
  try {
    console.log('Inicio servicio getOperation');

    const operations = require('../../data/data.json');

    const data = {};
    data[method] = operations[method];

    console.log(data);
    console.log('Fin servicio getOperation');

    return { isOk: true, data, error: null };
  } catch (e) {
    console.error('=>', e);
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
 * @returns la suma total de los números
 */
const postAddition = (number1, number2) => {
  try {
    console.log('Inicio servicio postAddition');

    const total = number1 + number2;

    console.log('Fin servicio postAddition');

    return { isOk: true, data: { number1, number2, total }, error: null };
  } catch (e) {
    console.error('=>', e);
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
 * @returns El producto de los dos números
 */
const putMultiply = (number1, number2) => {
  try {
    console.log('Inicio servicio putMultiply');

    const product = number1 * number2;

    console.log('Fin servicio putMultiply');

    return { isOk: true, data: { number1, number2, product }, error: null };
  } catch (e) {
    console.error('=>', e);
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
 * @returns el cociente de la división de los números
 */
const deleteDivision = (number1, number2, getRemainder) => {
  try {
    console.log('Inicio servicio deleteDivision');

    let remainder;

    const quotient = number1 / number2;

    console.log('Fin servicio deleteDivision');

    return { isOk: true, data: { number1, number2, quotient }, error: null };
  } catch (e) {
    console.error('=>', e);
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
