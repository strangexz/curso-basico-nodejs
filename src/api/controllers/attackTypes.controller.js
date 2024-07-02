/**
 * Attack Types Controller
 *
 * @description :: Server-side controller for handling incoming requests.
 */
const { StatusCodes } = require('http-status-codes');
const _ = require('underscore');
const validator = require('validator');

const log = require('../config/logger')(module);

/* Importando servicios */
const {
  getAttackTypesService,
  getOneAttackTypeByNameService,
  getOneAttackTypeByIdService,
  recordNewAttackTypeService,
  updateAttackTypeService,
  deleteAttackTypeService,
} = require('../services/attackType.service');

/**
 * Método que tiene como función devolver los tipos de ataques de pokemon
 *
 * @param {Request} req - objeto de solicitud http
 * @param {Response} res - objeto de respuesta http
 * @returns un objeto json con 3 atributos:
 * - isOk: booleano que indica si la solicitud es exitosa
 * - message: un mensaje descriptivo de la respuesta
 * - result: un arreglo con el resultado de la consulta.
 */
const getAttackTypes = async (req, res) => {
  log.verbose('Inicio de la ejecucion de getAttackTypes');
  log.info('Obteniendo los tipos de ataques...');

  let message;
  const response = {};

  try {
    response['isOk'] = false;

    const { isOk, data, error } = await getAttackTypesService();

    response['result'] = data;
    response['isOk'] = isOk;

    log.info('Devolviendo respuesta...');

    if (isOk === true) {
      message = 'Datos obtenidos exitosamente';
      log.info(message);
      log.verbose('Fin de la ejecucion de getAttackTypes');

      response['message'] = message;
      return res.status(StatusCodes.OK).json(response);
    } else {
      message = error;
      log.warn(message);
      log.verbose('Fin de la ejecucion de getAttackTypes');

      response['message'] = message;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
  } catch (error) {
    log.error(error.message);
    console.error(error.stack);
    log.verbose('Fin de la ejecucion de getAttackTypes');

    response['message'] = error.message;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

/**
 * Método que tiene como función devolver un tipo de de ataque de pokemon específico enviando el
 * identificador por la URL
 *
 * @param {Request} req - objeto de solicitud http
 * @param {Response} res - objeto de respuesta http
 * @param {Number} req.params.id - identificador del tipo de ataque que viaja como parámetro en la URL
 * @returns un objeto json con 3 atributos:
 * - isOk: booleano que indica si la solicitud es exitosa
 * - message: un mensaje descriptivo de la respuesta
 * - result: un arreglo con el resultado de la consulta.
 */
const getAttackTypeById = async (req, res) => {
  log.verbose('Inicio de la ejecucion de getAttackTypeById');
  log.info('Obteniendo el tipo de ataque por su ID...');

  let message;
  const response = {};

  try {
    let id;

    response['isOk'] = false;

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

    const { isOk, data, error } = await getOneAttackTypeByIdService(id);
    response['result'] = data;
    response['isOk'] = isOk;

    log.info('Devolviendo respuesta...');

    if (isOk === true) {
      message = 'Devolviendo los datos exitosamente';
      log.info(message);
      log.verbose('Fin de la ejecucion de getAttackTypeById');

      response['message'] = message;
      return res.status(StatusCodes.OK).json(response);
    } else {
      message = error;
      log.warn(message);
      log.verbose('Fin de la ejecucion de getAttackTypeById');

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

/**
 * Método que tiene como función evaluar los datos para registrar un nuevo
 * tipo de ataque pokemon
 *
 * @param {Request} req - objeto de solicitud http
 * @param {Response} res - objeto de respuesta http
 * @param {String} req.body.type - nombre del nuevo tipo de ataque
 * @returns un objeto json con 3 atributos:
 * - isOk: booleano que indica si la solicitud es exitosa
 * - message: un mensaje descriptivo de la respuesta
 * - result: un arreglo con el resultado de la consulta.
 */
const recordNewAttackType = async (req, res) => {
  log.verbose('Inicio de la ejecucion de recordNewAttackType');
  log.info('Registrando un nuevo tipo de ataque...');

  let message;
  const response = {};

  try {
    let type;

    response['isOk'] = false;

    // Validar el parámetro 'type'
    if (_.isUndefined(req.body.type)) {
      message = 'El parámetro "type" es requerido';
      log.warn(message);

      response['message'] = message;
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    if (!_.isString(req.body.type)) {
      message = 'El parámetro "type" debe ser una cadena de caracteres';
      log.warn(message);

      response['message'] = message;
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    if (!validator.isAlpha(req.body.type)) {
      message = 'El parámetro "type" debe ser una alfabetico';
      log.warn(message);

      response['message'] = message;
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    type = req.body.type;

    const existingRecord = await getOneAttackTypeByNameService(type);

    if (existingRecord.data.length > 0) {
      message = 'Ya existe un registro con el "type" enviado';
      log.warn(message);

      response['message'] = message;
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    const { isOk, data, error } = await recordNewAttackTypeService(type);

    response['result'] = data;
    response['isOk'] = isOk;
    log.info('Devolviendo respuesta...');

    if (isOk === true) {
      message = 'Devolviendo los datos exitosamente';
      log.warn(message);
      log.verbose('Fin de la ejecucion de recordNewAttackType');

      response['message'] = message;
      return res.status(StatusCodes.OK).json(response);
    } else {
      message = error;
      log.warn(message);
      log.verbose('Fin de la ejecucion de recordNewAttackType');

      response['message'] = message;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
  } catch (error) {
    log.error(error.message);
    console.error(error.stack);
    log.verbose('Fin de la ejecucion de recordNewAttackType');

    response['message'] = error.message;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

/**
 * Método que tiene como función evaluar los datos para actualizar los datos de un tipo de ataque pokemon
 * en específico por su identificador
 *
 * @param {Request} req - objeto de solicitud http
 * @param {Response} res - objeto de respuesta http
 * @param {Number} req.params.id - identificador del tipo de ataque que viaja como parámetro en la URL
 * @param {String} req.body.type - nombre del nuevo tipo de ataque
 * @returns un objeto json con 3 atributos:
 * - isOk: booleano que indica si la solicitud es exitosa
 * - message: un mensaje descriptivo de la respuesta
 * - result: un arreglo con el resultado de la consulta.
 */
const updateAttackType = async (req, res) => {
  log.verbose('Inicio de la ejecucion de updateAttackType');
  log.info('Obteniendo las operaciones');

  let message;
  const response = {};

  try {
    let type;

    response['isOk'] = false;

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

    // Validar el parámetro 'type'
    if (!_.isString(req.body.type)) {
      message = 'El parámetro "type" debe ser una cadena de caracteres';
      log.warn(message);

      response['message'] = message;
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    if (!validator.isAlpha(req.body.type)) {
      message = 'El parámetro "type" debe ser una alfabetico';
      log.warn(message);

      response['message'] = message;
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    type = req.body.type;

    const existingRecord = await getOneAttackTypeByNameService(type);

    if (existingRecord.data.length > 0) {
      message = 'Ya existe un registro con el "type" enviado';
      log.warn(message);

      response['message'] = message;
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    const { isOk, data, error } = await updateAttackTypeService(id, type);

    response['result'] = data;
    response['isOk'] = isOk;

    log.info('Devolviendo respuesta...');

    if (isOk === true) {
      message = 'El registro fue actualizado exitosamente';
      log.warn(message);
      log.verbose('Fin de la ejecucion de updateAttackType');

      response['message'] = message;
      return res.status(StatusCodes.OK).json(response);
    } else {
      message = error;
      log.warn(message);
      log.verbose('Fin de la ejecucion de updateAttackType');

      response['message'] = message;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
  } catch (error) {
    log.error(error.message);
    console.error(error.stack);
    log.verbose('Fin de la ejecucion de updateAttackType');

    response['message'] = error.message;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

/**
 * Método que tiene como función evaluar los datos para borrar un tipo de ataque pokemon en específico
 * por su identificador
 *
 * @param {Request} req - objeto de solicitud http
 * @param {Response} res - objeto de respuesta http
 * @param {Number} req.body.id - identificador del tipo de ataque que viaja como parámetro en el cuerpo
 * de la solicitud
 * @returns un objeto json con 3 atributos:
 * - isOk: booleano que indica si la solicitud es exitosa
 * - message: un mensaje descriptivo de la respuesta
 * - result: un arreglo con el resultado de la consulta.
 */
const deleteAttackType = async (req, res) => {
  log.verbose('Inicio de la ejecucion de deleteAttackType');
  log.info('Obteniendo las operaciones');

  let message;
  const response = {};

  try {
    let type;

    response['isOk'] = false;

    // Validar el parámetro 'id'
    if (_.isUndefined(req.body.id)) {
      message = 'El parámetro "id" es requerido';
      log.warn(message);

      response['message'] = message;
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    if (!_.isString(req.body.id) && !_.isNumber(req.body.id)) {
      message = 'El parámetro "id" debe ser un valor numérico';
      log.warn(message);

      response['message'] = message;
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    if (_.isString(req.body.id) && !validator.isNumeric(req.body.id)) {
      message = 'El parámetro "id" debe ser un valor numérico';
      log.warn(message);

      response['message'] = message;
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    id = parseInt(req.body.id);

    if (id <= 0) {
      message = 'El parámetro "id" debe ser mayor que cero';
      log.warn(message);

      response['message'] = message;
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    const { isOk, data, error } = await deleteAttackTypeService(id);

    response['result'] = data;
    response['isOk'] = isOk;

    log.info('Devolviendo respuesta...');

    if (isOk === true) {
      message = 'El registro fue eliminado exitosamente';
      log.warn(message);
      log.verbose('Fin de la ejecucion de deleteAttackType');

      response['message'] = message;
      return res.status(StatusCodes.OK).json(response);
    } else {
      message = error;
      log.warn(message);
      log.verbose('Fin de la ejecucion de deleteAttackType');

      response['message'] = error;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
  } catch (e) {
    log.error(error.message);
    console.error(error.stack);
    log.verbose('Fin de la ejecucion de deleteAttackType');

    response['message'] = error.message;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

module.exports = {
  getAttackTypes,
  getAttackTypeById,
  recordNewAttackType,
  updateAttackType,
  deleteAttackType,
};
