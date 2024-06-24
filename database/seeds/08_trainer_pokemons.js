const tableName = 'trainer_pokemons';

const data = require('../data/dev/trainer_pokemons.json');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(tableName).del()
  await knex(tableName).insert(data);
};
