const express = require('express');
const BasicController = require('../controllers/basic.controller');

const basic = express.Router();

// Definición de rutas
basic.get('/basic/getOperations', BasicController.getOperations);
basic.post('/basic/postAddition', BasicController.postAddition);

module.exports = basic;
