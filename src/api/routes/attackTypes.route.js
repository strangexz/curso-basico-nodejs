const express = require('express');
const AttackTypesController = require('../controllers/attackTypes.controller');

const endpoints = express.Router();

// Definición de rutas
endpoints.get('/attackTypes/getAllAttackTypes', AttackTypesController.getAttackTypes);
endpoints.get('/attackTypes/getOneAttackType/:id', AttackTypesController.getAttackType);

module.exports = endpoints;
