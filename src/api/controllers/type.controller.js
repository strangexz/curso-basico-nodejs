/**
 * Types Controller
 *
 * @description :: Server-side controller for handling incoming requests.
 */
const { StatusCodes } = require('http-status-codes');
const _ = require('underscore');
const validator = require('validator');

const log = require('../config/logger')(module);

/* Importando servicios */
const { getTypesService, getOneTypeByIdService } = require('../services/type.service');

/**
 * Método que tiene como función devolver los tipos de pokemon
 *
 * @param {Request} req - objeto de solicitud http
 * @param {Response} res - objeto de respuesta http
 * @returns un objeto json con 3 atributos:
 * - isOk: booleano que indica si la solicitud es exitosa
 * - message: un mensaje descriptivo de la respuesta
 * - result: un arreglo con el resultado de la consulta.
 */
const getTypes = async (req, res) => {
  log.verbose('Inicio de la ejecucion de getTypes');
  log.info('Obteniendo los tipos de pokemon...');

  let message, isPopulated;
  const response = {};

  try {
    response['isOk'] = false;
    isPopulated = false;

    // validar la bandera "isPopulated"
    if (!_.isUndefined(req.query.isPopulated)) {
      if (!validator.isBoolean(req.query.isPopulated)) {
        message = 'El parámetro "isPopulated" debe ser un valor lógico booleano';
        log.warn(message);

        response['message'] = message;
        response['result'] = req.query;

        return res.status(StatusCodes.BAD_REQUEST).json(response);
      }

      isPopulated = req.query.isPopulated.toUpperCase() === 'TRUE' ? true : false;
    }

    const { isOk, data, error } = await getTypesService(isPopulated);

    response['result'] = data;
    response['isOk'] = isOk;

    log.info('Devolviendo respuesta...');

    if (isOk === true) {
      message = 'Datos obtenidos exitosamente';
      log.info(message);
      log.verbose('Fin de la ejecucion de getTypes');

      response['message'] = message;
      return res.status(StatusCodes.OK).json(response);
    } else {
      message = error;
      log.warn(message);
      log.verbose('Fin de la ejecucion de getTypes');

      response['message'] = message;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
  } catch (error) {
    log.error(error.message);
    console.error(error.stack);
    log.verbose('Fin de la ejecucion de getTypes');

    response['message'] = error.message;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

/**
 * Método que tiene como función devolver un tipos de pokemon específico
 * por su identificador
 *
 * @param {Request} req - objeto de solicitud http
 * @param {Response} res - objeto de respuesta http
 * @returns un objeto json con 3 atributos:
 * - isOk: booleano que indica si la solicitud es exitosa
 * - message: un mensaje descriptivo de la respuesta
 * - result: un arreglo con el resultado de la consulta.
 */
const getOneTypeById = async (req, res) => {
  log.verbose('Inicio de la ejecucion de getOneTypeById');
  log.info('Obteniendo el tipo de pokemon...');

  let message;
  const response = {};

  try {
    let id;

    response['isOk'] = false;
    isPopulated = false;

    // validar la bandera "isPopulated"
    if (!_.isUndefined(req.query.isPopulated)) {
      if (!validator.isBoolean(req.query.isPopulated)) {
        message = 'El parámetro "isPopulated" debe ser un valor lógico booleano';
        log.warn(message);

        response['message'] = message;
        response['result'] = req.query;

        return res.status(StatusCodes.BAD_REQUEST).json(response);
      }

      isPopulated = req.query.isPopulated.toUpperCase() === 'TRUE' ? true : false;
    }

    // Validar el parámetro 'id'
    if (!validator.isNumeric(req.params.id)) {
      message = 'El parámetro "id" debe ser un valor numérico';
      log.warn(message);

      response['message'] = message;
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    id = parseInt(req.params.id);

    if (id <= 0) {
      message = 'El parámetro "id" debe ser mayor que cero';
      log.warn(message);

      response['message'] = message;
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    const { isOk, data, error } = await getOneTypeByIdService(id, isPopulated);
    response['result'] = data;
    response['isOk'] = isOk;

    log.info('Devolviendo respuesta...');

    if (isOk === true) {
      message = 'Devolviendo los datos exitosamente';
      log.info(message);
      log.verbose('Fin de la ejecucion de getOneTypeById');

      response['message'] = message;
      return res.status(StatusCodes.OK).json(response);
    } else {
      message = error;
      log.warn(message);
      log.verbose('Fin de la ejecucion de getOneTypeById');

      response['message'] = message;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
  } catch (error) {
    log.error(error.message);
    console.error(error.stack);
    log.verbose('Fin de la ejecucion de getAttackTypeById');

    response['message'] = error.message;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

module.exports = {
  getTypes,
  getOneTypeById
};