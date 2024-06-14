const express = require('express');

const basicRoutes = require('./basic.route');

const api = express();

api.use(basicRoutes);

module.exports = api;
