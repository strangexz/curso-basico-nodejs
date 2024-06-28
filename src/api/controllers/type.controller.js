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
const { getTypesService } = require('../services/type.service');

const getTypes = async (req, res) => {
  log.verbose('Inicio de la ejecucion de getTypes');
  log.info('Obteniendo los tipos de pokemon...');

  let message;
  const response = {};

  try {
    response['isOk'] = false;

    const { isOk, data, error } = await getTypesService();

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

module.exports = {
  getTypes,
};
