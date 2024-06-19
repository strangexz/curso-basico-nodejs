/**
 * Basic Controller
 *
 * @description :: Server-side controller for handling incoming requests.
 */
const _ = require('underscore');
const validator = require('validator');
const path = require('path');
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
 * @returns {json} un objeto json con 3 atributos:
 * - isOk: booleano que indica si la solicitud es exitosa
 * - message: un mensaje descriptivo de la respuesta
 * - result: un arreglo con el resultado de la consulta.
 */
const getOperations = (req, res) => {
  try {
    console.log('Entrando al controlador getOperations...');

    const methods = [];
    const response = {};

    response['isOk'] = false;

    if (!_.isUndefined(req.query.methods)) {
      // if (!_.isArray(req.query.methods)) {
      //   response['message'] = 'El campo \'methods\' debe ser un arreglo';
      //   response['result'] = req.query;

      //   return res.status(StatusCodes.BAD_REQUEST).json(response);
      // }

      for (const method of req.query.methods) {
        if (!validator.isAlpha(method)) {
          response['message'] = 'El campo "methods" debe ser una cadena de caracteres';
          response['result'] = req.query;

          return res.status(StatusCodes.BAD_REQUEST).json(response);
        }

        if (!_.contains(['get', 'post', 'put', 'delete'], method.toLowerCase())) {
          response['message'] = 'El valor del campo "methods" no permitido';
          response['result'] = req.query;

          return res.status(StatusCodes.BAD_REQUEST).json(response);
        }

        methods.push(method);
      }
    }

    const { data, isOk } = BasicService.getOperations(methods);

    response['result'] = data;
    response['isOk'] = isOk;

    console.log('Devolviendo respuesta...');

    if (isOk === true) {
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
 * Obtención de una operación específica
 *
 * Método que tiene como función devolver un dato en específico
 *
 * @param {Request} req - objeto de solicitud http
 * @param {Response} res - objeto de respuesta http
 * @returns {json} un objeto json con 3 atributos:
 * - isOk: booleano que indica si la solicitud es exitosa
 * - message: un mensaje descriptivo de la respuesta
 * - result: un arreglo con el resultado de la consulta.
 */
const getOperation = (req, res) => {
  try {
    console.log('Entrando al controlador getOperation...');

    const response = {};

    response['isOk'] = false;

    if (!_.contains(['get', 'post', 'put', 'delete'], req.params.method.toLowerCase())) {
      response['message'] = 'El valor del campo "method" no es permitido';
      response['result'] = req.params;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    const { data, isOk } = BasicService.getOperation(req.params.method);

    response['result'] = data;
    response['isOk'] = isOk;

    console.log('Devolviendo respuesta...');

    if (isOk === true) {
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
 * @returns {json} un objeto json con 3 atributos:
 * - isOk: booleano que indica si la solicitud es exitosa
 * - message: un mensaje descriptivo de la respuesta
 * - result: un arreglo con el resultado de la consulta.
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
  const { data, isOk } = BasicService.postAddition(num1, num2);

  response['result'] = data;
  response['isOk'] = isOk;

  console.log('Devolviendo respuesta...');

  if (isOk === true) {
    response['message'] = 'Devolviendo los datos exitosamente';
    return res.status(StatusCodes.OK).json(response);
  } else {
    response['message'] = result.error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

/**
 * Multiplica 2 números
 *
 * Método que tiene la función de recibir 2 números, multiplicarlos
 * y devolver el producto de ello.
 *
 * @param {Request} req - objeto de solicitud http
 * @param {Response} res - objeto de respuesta http
 * @returns {json} un objeto json con 3 atributos:
 * - isOk: booleano que indica si la solicitud es exitosa
 * - message: un mensaje descriptivo de la respuesta
 * - result: un arreglo con el resultado de la consulta.
 */
const putMultiply = (req, res) => {
  console.log('Entrando al controlador putMultiply...');

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
  const { data, isOk } = BasicService.putMultiply(num1, num2);

  response['result'] = data;
  response['isOk'] = isOk;

  console.log('Devolviendo respuesta...');

  if (isOk === true) {
    response['message'] = 'Devolviendo los datos exitosamente';
    return res.status(StatusCodes.OK).json(response);
  } else {
    response['message'] = result.error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

/**
 * Divide 2 números
 *
 * Método que tiene la función de recibir 2 números, dividirlos
 * y devolver el cociente de la operación.
 *
 * @param {Request} req - objeto de solicitud http
 * @param {Response} res - objeto de respuesta http
 * @returns {json} un objeto json con 3 atributos:
 * - isOk: booleano que indica si la solicitud es exitosa
 * - message: un mensaje descriptivo de la respuesta
 * - result: un arreglo con el resultado de la consulta.
 */
const deleteDivision = (req, res) => {
  console.log('Entrando al controlador deleteDivision...');

  const response = {};

  response['isOk'] = false;

  /* Validando campo "num1" */
  if (_.isUndefined(req.body.num1)) {
    response['message'] = 'El campo num1 requerido';

    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }

  if (!_.isNumber(req.body.num1)) {
    response['message'] = 'El campo num1 debe ser un número';

    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }

  /* Validando campo "num2" */
  if (_.isUndefined(req.body.num2)) {
    response['message'] = 'Campo num2 requerido';

    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }

  if (!_.isNumber(req.body.num2)) {
    response['message'] = 'El campo num2 debe ser un número';

    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }

  if (req.body.num2 === 0) {
    response['message'] = 'El campo num2 debe ser mayo a cero (0)';

    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }

  const num1 = req.body.num1;
  const num2 = req.body.num2;
  const { data, isOk } = BasicService.deleteDivision(num1, num2);

  response['result'] = data;
  response['isOk'] = isOk;

  console.log('Devolviendo respuesta...');

  if (isOk === true) {
    response['message'] = 'Devolviendo los datos exitosamente';
    return res.status(StatusCodes.OK).json(response);
  } else {
    response['message'] = result.error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

/**
 * Devuelve el frontpage
 *
 * @param {Request} req - objeto de solicitud http
 * @param {Response} res - objeto de respuesta http
 * @returns un archivo html con el frontpage del api
 */
const getFrontpage = (req, res) => {
  return res.sendFile(path.join(__dirname, '../../views/index.html'));
};

module.exports = {
  getOperations,
  getOperation,
  postAddition,
  putMultiply,
  deleteDivision,
  getFrontpage,
};
