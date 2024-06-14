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

    const data = require('../../data/data1.json');

    console.log('Devolviendo respuesta...');

    return { isOk: true, data, error: null };
  } catch (e) {
    console.error('=>', e);
    return { isOk: false, data: null, error: e.message };
  }
};

module.exports = {
  getOperations,
};
