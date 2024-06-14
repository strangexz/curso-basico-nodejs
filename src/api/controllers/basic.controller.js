const _ = require('underscore');
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
    response['isOk'] = result.isOk;

    console.log('Devolviendo respuesta...');

    if (result.isOk === true) {
      response['message'] = 'Devolviendo los datos exitosamente';
      return res.status(StatusCodes.OK).json(response);
    } else {
      response['message'] = result.error;
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Suma de 2 números
 *
 * Método que tiene la función de recibir 2 números, sumarlos
 * y devolver el total de esa suma.
 *
 * @param {Request} req - objeto de solicitud http
 * @param {Response} res - objeto de respuesta http
 */
const postAddition = (req, res) => {
  console.log('Entrando al controlador postAddition...');

  const response = {};

  response['isOk'] = false;

  /* Validando el campo num1 */
  if (_.isUndefined(req.body.num1)) {
    response['message'] = 'El campo num1 requerido';

    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }

  if (!_.isNumber(req.body.num1)) {
    response['message'] = 'El campo num1 debe ser un número';

    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }

  if (_.isUndefined(req.body.num2)) {
    response['message'] = 'Campo num2 requerido';

    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }

  if (!_.isNumber(req.body.num2)) {
    response['message'] = 'El campo num2 debe ser un número';

    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }

  const num1 = req.body.num1;
  const num2 = req.body.num2;
  const result = BasicService.postAddition(num1, num2);

  response['result'] = result.data;
  response['isOk'] = result.isOk;

  console.log('Devolviendo respuesta...');

  if (result.isOk === true) {
    response['message'] = 'Devolviendo los datos exitosamente';
    return res.status(StatusCodes.OK).json(response);
  } else {
    response['message'] = result.error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

module.exports = {
  getOperations,
  postAddition,
};
