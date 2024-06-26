const express = require('express');

const basicRoutes = require('./basic.route');
const attackTypesRoutes = require('./attackTypes.route');

const api = express();

api.use(basicRoutes);
api.use(attackTypesRoutes);

module.exports = api;
