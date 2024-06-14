/**
 * Obtención de operaciones
 *
 * Método que tiene como función devolver los datos de un
 * archivo JSON
 *
 * @returns {JSON} objeto JSON con los datos a devolver
 */
const getOperations = () => {
  try {
    console.log('Entrando al método getOperations...');

    const data = require('../../data/data.json');

    console.log('Devolviendo respuesta...');

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
    console.log('Entrando al servicio postAddittion...');

    const total = number1 + number2;

    console.log('Saliendo del servicio postAddition.');

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
    console.log('Entrando al servicio putMultiply...');

    const product = number1 * number2;

    console.log('Saliendo del servicio putMultiply.');

    return { isOk: true, data: { number1, number2, product }, error: null };
  } catch (e) {
    console.error('=>', e);
    return { isOk: false, data: null, error: e.message };
  }
}

module.exports = {
  getOperations,
  postAddition,
  putMultiply
};
