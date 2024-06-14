const express = require('express');
const BasicController = require('../controllers/basic.controller');

const basic = express.Router();

// Definición de rutas
basic.get('/basic/getOperations', BasicController.getOperations);
basic.post('/basic/postAddition', BasicController.postAddition);
basic.put('/basic/putMultiply', BasicController.putMultiply);

module.exports = basic;
