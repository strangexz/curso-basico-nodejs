const tableName = 'trainers';

const data = require('../data/dev/trainers.json');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).del();
  await knex(tableName).insert(data);
};
