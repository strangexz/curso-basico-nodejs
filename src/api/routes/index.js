const express = require('express');

const basicRoutes = require('./basic.route');
const attackTypesRoutes = require('./attackTypes.route');
const typesRoutes = require('./type.route');

const api = express();

api.use(basicRoutes);
api.use(attackTypesRoutes);
api.use(typesRoutes);

module.exports = api;
