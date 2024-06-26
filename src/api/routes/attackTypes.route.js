const express = require('express');
const {
  getAttackTypeById,
  getAttackTypes,
  recordNewAttackType,
  updateAttackType,
  deleteAttackType
} = require('../controllers/attackTypes.controller');

const endpoints = express.Router();

// Definición de rutas
endpoints.get('/attackTypes/getAllAttackTypes', getAttackTypes);
endpoints.get('/attackTypes/getOneAttackType/:id', getAttackTypeById);
endpoints.post('/attackTypes/recordNewAttackType', recordNewAttackType);
endpoints.put('/attackTypes/updateAttackType/:id', updateAttackType);
endpoints.delete('/attackTypes/deleteAttackType', deleteAttackType);

module.exports = endpoints;
