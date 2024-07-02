const express = require('express');

const { getTypes, getOneTypeById } = require('../controllers/type.controller');

const endpoints = express.Router();

// Definición de rutas
endpoints.get('/types/getAllTypes', getTypes);
endpoints.get('/types/getOneType/:id', getOneTypeById);

module.exports = endpoints;
