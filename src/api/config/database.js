const knex = require('knex');
const knexfile = require('../../../knexfile');

const env = process.env.NODE_ENV || 'local';

module.exports = knex(knexfile[env]);
