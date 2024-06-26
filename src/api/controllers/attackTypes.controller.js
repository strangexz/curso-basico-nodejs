/**
 * Attack Types Controller
 *
 * @description :: Server-side controller for handling incoming requests.
 */
const _ = require('underscore');
const validator = require('validator');
const path = require('path');
const { StatusCodes } = require('http-status-codes');

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
  console.log('Entrando al controlador getAttackTypes...');
  const response = {};
  response['isOk'] = false;

  try {
    const { isOk, data, error } = await getAttackTypesService();
    response['result'] = data;
    response['isOk'] = isOk;

    console.log('Devolviendo respuesta...');

    if (isOk === true) {
      response['message'] = 'Devolviendo los datos exitosamente';
      return res.status(StatusCodes.OK).json(response);
    } else {
      response['message'] = error;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
  } catch (e) {
    response['message'] = e.stack;
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
  console.log('Entrando al controlador getAttackTypeById...');

  const response = {};
  let id;

  response['isOk'] = false;

  try {
    // Validar el parámetro 'id'
    if (!validator.isNumeric(req.params.id)) {
      response['message'] = 'El parámetro "id" debe ser un valor numérico';
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    id = parseInt(req.params.id);

    if (id <= 0) {
      response['message'] = 'El parámetro "id" debe ser mayor que cero';
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    const { isOk, data, error } = await getOneAttackTypeByIdService(id);
    response['result'] = data;
    response['isOk'] = isOk;
    console.log('Devolviendo respuesta...');

    if (isOk === true) {
      response['message'] = 'Devolviendo los datos exitosamente';
      return res.status(StatusCodes.OK).json(response);
    } else {
      response['message'] = error;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
  } catch (e) {
    response['message'] = e.stack;
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
  console.log('Entrando al controlador recordNewAttackType...');

  const response = {};
  let id, type;

  response['isOk'] = false;

  try {
    // Validar el parámetro 'type'
    if (_.isUndefined(req.body.type)) {
      response['message'] = 'El parámetro "type" es requerido';
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    if (!_.isString(req.body.type)) {
      response['message'] = 'El parámetro "type" debe ser una cadena de caracteres';
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    if (!validator.isAlpha(req.body.type)) {
      response['message'] = 'El parámetro "type" debe ser una alfabetico';
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    type = req.body.type;

    const existingRecord = await getOneAttackTypeByNameService(type);

    if (existingRecord.data.length > 0) {
      response['message'] = 'Ya existe un registro con el "type" enviado';
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    const { isOk, data, error } = await recordNewAttackTypeService(type);
    response['result'] = data;
    response['isOk'] = isOk;
    console.log('Devolviendo respuesta...');

    if (isOk === true) {
      response['message'] = 'Devolviendo los datos exitosamente';
      return res.status(StatusCodes.OK).json(response);
    } else {
      response['message'] = error;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
  } catch (e) {
    response['message'] = e.stack;
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
  console.log('Entrando al controlador updateAttackType...');

  const response = {};
  let type;

  response['isOk'] = false;

  try {
    // Validar el parámetro 'id'
    if (!validator.isNumeric(req.params.id)) {
      response['message'] = 'El parámetro "id" debe ser un valor numérico';
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    id = parseInt(req.params.id);

    if (id <= 0) {
      response['message'] = 'El parámetro "id" debe ser mayor que cero';
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    // Validar el parámetro 'type'
    if (!_.isString(req.body.type)) {
      response['message'] = 'El parámetro "type" debe ser una cadena de caracteres';
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    if (!validator.isAlpha(req.body.type)) {
      response['message'] = 'El parámetro "type" debe ser una alfabetico';
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    type = req.body.type;

    const existingRecord = await getOneAttackTypeByNameService(type);

    if (existingRecord.data.length > 0) {
      response['message'] = 'Ya existe un registro con el "type" enviado';
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    const { isOk, data, error } = await updateAttackTypeService(id, type);

    response['result'] = data;
    response['isOk'] = isOk;
    console.log('Devolviendo respuesta...');

    if (isOk === true) {
      response['message'] = 'El registro fue actualizado exitosamente';
      return res.status(StatusCodes.OK).json(response);
    } else {
      response['message'] = error;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
  } catch (e) {
    response['message'] = e.stack;
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
  console.log('Entrando al controlador updateAttackType...');

  const response = {};
  let type;

  response['isOk'] = false;

  try {
    // Validar el parámetro 'id'
    if (_.isUndefined(req.body.id)) {
      response['message'] = 'El parámetro "id" es requerido';
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    if (!_.isString(req.body.id) && !_.isNumber(req.body.id)) {
      response['message'] = 'El parámetro "id" debe ser un valor numérico';
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    if (_.isString(req.body.id) && !validator.isNumeric(req.body.id)) {
      response['message'] = 'El parámetro "id" debe ser un valor numérico';
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    id = parseInt(req.body.id);

    if (id <= 0) {
      response['message'] = 'El parámetro "id" debe ser mayor que cero';
      response['result'] = req.query;

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    const { isOk, data, error } = await deleteAttackTypeService(id);

    response['result'] = data;
    response['isOk'] = isOk;
    console.log('Devolviendo respuesta...');

    if (isOk === true) {
      response['message'] = 'El registro fue eliminado exitosamente';
      return res.status(StatusCodes.OK).json(response);
    } else {
      response['message'] = error;
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
  } catch (e) {
    response['message'] = e.stack;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

module.exports = {
  getAttackTypes,
  getAttackTypeById,
  recordNewAttackType,
  updateAttackType,
  deleteAttackType
};
