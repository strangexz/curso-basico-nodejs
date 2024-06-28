/**
 * Basic Controller
 *
 * @description :: Server-side controller for handling incoming requests.
 */
const _ = require('underscore');
const validator = require('validator');
const path = require('path');
const { StatusCodes } = require('http-status-codes');

const log = require('../config/logger')(module);

/* Importanto servicios */
const BasicService = require('../services/basic.service');

/**
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
  log.verbose('Inicio de la ejecucion de getOperations');
  log.info('Obteniendo las operaciones');

  let message;
  const response = {};

  try {
    const methods = [];

    response['isOk'] = false;

    if (!_.isUndefined(req.query.methods)) {
      for (const method of req.query.methods) {
        if (!validator.isAlpha(method)) {
          message = 'El campo "methods" debe ser una cadena de caracteres';
          log.warn(message);

          response['message'] = message;
          response['result'] = req.query;

          return res.status(StatusCodes.BAD_REQUEST).json(response);
        }

        if (!_.contains(['get', 'post', 'put', 'delete'], method.toLowerCase())) {
          message = 'El valor del campo "methods" no permitido';
          log.warn(message);

          response['message'] = message;
          response['result'] = req.query;

          return res.status(StatusCodes.BAD_REQUEST).json(response);
        }

        methods.push(method);
      }
    }

    const { data, isOk } = BasicService.getOperations(methods);

    response['result'] = data;
    response['isOk'] = isOk;

    log.info('Devolviendo respuesta...');

    if (isOk === true) {
      message = 'Devolviendo los datos exitosamente';

      log.info(message);
      log.verbose('Fin de la ejecucion de getOperations');

      response['message'] = message;
      return res.status(StatusCodes.OK).json(response);
    } else {
      message = result.error;

      log.warn(message);
      log.verbose('Fin de la ejecucion de getOperations');

      response['message'] = message;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
  } catch (error) {
    log.error(error.message);
    console.error(error.stack);
    log.verbose('Fin de la ejecucion de getOperations');

    response['message'] = error.message;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

/**
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
  log.verbose('Inicio de la ejecucion de getOperation');
  log.info('Obteniendo una operacion');

  let message;
  const response = {};

  try {
    response['isOk'] = false;

    if (!_.contains(['get', 'post', 'put', 'delete'], req.params.method.toLowerCase())) {
      message = 'El valor del campo "method" no es permitido';

      log.warn(message);
      response['message'] = message;
      response['result'] = req.params;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    const { data, isOk } = BasicService.getOperation(req.params.method);

    response['result'] = data;
    response['isOk'] = isOk;

    log.info('Devolviendo respuesta...');

    if (isOk === true) {
      message = 'Devolviendo los datos exitosamente';
      log.info(message);

      response['message'] = message;
      return res.status(StatusCodes.OK).json(response);
    } else {
      message = result.error;
      log.info(message);

      response['message'] = message;
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
  } catch (error) {
    log.error(error.message);
    console.error(error.stack);
    log.verbose('Fin de la ejecucion de getOperation');

    response['message'] = error.message;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

/**
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
  log.verbose('Inicio de la ejecucion de postAddition');
  log.info('Realiza una suma');

  let message;
  const response = {};

  try {
    response['isOk'] = false;

    /* Validando el campo num1 */
    if (_.isUndefined(req.body.num1)) {
      message = 'El campo num1 requerido';
      log.warn(message);

      response['message'] = message;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    if (!_.isNumber(req.body.num1)) {
      message = 'El campo num1 debe ser un número';
      log.warn(message);

      response['message'] = message;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    if (_.isUndefined(req.body.num2)) {
      message = 'Campo num2 requerido';
      log.warn(message);

      response['message'] = message;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    if (!_.isNumber(req.body.num2)) {
      message = 'El campo num2 debe ser un número';
      log.warn(message);

      response['message'] = message;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    const num1 = req.body.num1;
    const num2 = req.body.num2;
    const { data, isOk } = BasicService.postAddition(num1, num2);

    response['result'] = data;
    response['isOk'] = isOk;

    log.info('Devolviendo respuesta...');

    if (isOk === true) {
      message = 'Devolviendo los datos exitosamente';
      log.info(message);

      response['message'] = message;
      return res.status(StatusCodes.OK).json(response);
    } else {
      message = result.error;
      log.warn(message);

      response['message'] = message;
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
  } catch (error) {
    log.error(error.message);
    console.error(error.stack);
    log.verbose('Fin de la ejecucion de postAddition');

    response['message'] = error.message;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

/**
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
  log.verbose('Inicio de la ejecucion de putMultiply');
  log.info('Realiza una multiplicacion');

  let message;
  const response = {};

  try {
    response['isOk'] = false;

    /* Validando el campo num1 */
    if (_.isUndefined(req.body.num1)) {
      message = 'El campo num1 requerido';
      log.warn(message);

      response['message'] = message;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    if (!_.isNumber(req.body.num1)) {
      message = 'El campo num1 debe ser un número';
      log.warn(message);

      response['message'] = message;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    if (_.isUndefined(req.body.num2)) {
      message = 'Campo num2 requerido';
      log.warn(message);

      response['message'] = message;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    if (!_.isNumber(req.body.num2)) {
      message = 'El campo num2 debe ser un número';
      log.warn(message);

      response['message'] = message;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    const num1 = req.body.num1;
    const num2 = req.body.num2;
    const { data, isOk } = BasicService.putMultiply(num1, num2);

    response['result'] = data;
    response['isOk'] = isOk;

    log.info('Devolviendo respuesta...');

    if (isOk === true) {
      message = 'Devolviendo los datos exitosamente';
      log.info(message);

      response['message'] = message;
      return res.status(StatusCodes.OK).json(response);
    } else {
      message = result.error;
      log.warn(message);

      response['message'] = message;
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
  } catch (error) {
    log.error(error.message);
    console.error(error.stack);
    log.verbose('Fin de la ejecucion de putMultiply');

    response['message'] = error.message;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

/**
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
  log.verbose('Inicio de la ejecucion de deleteDivision');
  log.info('Realiza una division');

  let message;
  const response = {};

  try {
    response['isOk'] = false;

    /* Validando campo "num1" */
    if (_.isUndefined(req.body.num1)) {
      message = 'El campo num1 requerido';
      log.warn(message);

      response['message'] = message;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    if (!_.isNumber(req.body.num1)) {
      message = 'El campo num1 debe ser un número';
      log.warn(message);

      response['message'] = message;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    /* Validando campo "num2" */
    if (_.isUndefined(req.body.num2)) {
      message = 'Campo num2 requerido';
      log.warn(message);

      response['message'] = message;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    if (!_.isNumber(req.body.num2)) {
      message = 'El campo num2 debe ser un número';
      log.warn(message);

      response['message'] = message;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    if (req.body.num2 === 0) {
      message = 'El campo num2 debe ser mayo a cero (0)';
      log.warn(message);

      response['message'] = message;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    const num1 = req.body.num1;
    const num2 = req.body.num2;
    const { data, isOk } = BasicService.deleteDivision(num1, num2);

    response['result'] = data;
    response['isOk'] = isOk;

    log.info('Devolviendo respuesta...');

    if (isOk === true) {
      message = 'Devolviendo los datos exitosamente';
      log.info(message);

      response['message'] = message;
      return res.status(StatusCodes.OK).json(response);
    } else {
      message = result.error;
      log.warn(message);

      response['message'] = message;
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
  } catch (error) {
    log.error(error.message);
    console.error(error.stack);
    log.verbose('Fin de la ejecucion de putMultiply');

    response['message'] = error.message;
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
