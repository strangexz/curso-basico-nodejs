const { StatusCodes } = require('http-status-codes');

/* Importanto servicios */
const BasicService = require('../services/basic.service');
/**
 * Obtención de operaciones
 *
 * Método que tiene como función devolver los datos de un
 * archivo JSON
 *
 * @param {Request} req - objeto de solicitud http
 * @param {Response} res - objeto de respuesta http
 */
const getOperations = (req, res) => {
  try {
    console.log('Entrando al controlador getOperations...');

    const response = {};
    const result = BasicService.getOperations();

    response['result'] = result.data;

    console.log('Devolviendo respuesta...');

    if (result.isOk === true) {
      response['message'] = 'Devolviendo los datos exitosamente';
      return res.status(StatusCodes.OK).json(response);
    }else{
      response['message'] = result.error.stack;
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
  } catch (error) {
    console.error(e);
    throw e;
  }
};

module.exports = {
  getOperations,
};
