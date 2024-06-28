const express = require('express');

const { getTypes } = require('../controllers/type.controller');

const endpoints = express.Router();

// Definición de rutas
endpoints.get('/types/getAllTypes', getTypes);

module.exports = endpoints;
