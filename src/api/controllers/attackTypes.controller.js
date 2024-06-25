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
const attackTypesService = require('../services/attackType.service');

/**
 * Método que tiene como función devolver los tipos de
 * de ataques de pokemon
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
    const { isOk, data, error } = await attackTypesService.getAttackTypes();
    response['result'] = data;
    response['isOk'] = isOk;

    console.log('Devolviendo respuesta...');

    if (isOk === true) {
      response['message'] = 'Devolviendo los datos exitosamente';
      return res.status(StatusCodes.OK).json(response);
    } else {
      response['message'] = error;
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
  } catch (e) {
    response['message'] = e.stack;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

/**
 * Método que tiene como función devolver un tipo de
 * de ataque de pokemon específico enviando el ID del
 * por URL
 *
 * @param {Request} req - objeto de solicitud http
 * @param {Response} res - objeto de respuesta http
 * @returns un objeto json con 3 atributos:
 * - isOk: booleano que indica si la solicitud es exitosa
 * - message: un mensaje descriptivo de la respuesta
 * - result: un arreglo con el resultado de la consulta.
 */
const getAttackType = async (req, res) => {
  console.log('Entrando al controlador getAttackTypes...');

  const response = {};
  let id;

  response['isOk'] = false;

  try {
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


    const { isOk, data, error } = await attackTypesService.getOneAttackType(id);
    response['result'] = data;
    response['isOk'] = isOk;
    console.log('Devolviendo respuesta...');

    if (isOk === true) {
      response['message'] = 'Devolviendo los datos exitosamente';
      return res.status(StatusCodes.OK).json(response);
    } else {
      response['message'] = error;
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
  } catch (e) {
    response['message'] = e.stack;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  }
};

module.exports = {
  getAttackTypes,
  getAttackType
};
