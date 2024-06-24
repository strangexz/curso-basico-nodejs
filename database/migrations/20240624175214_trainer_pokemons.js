const tableName = 'trainer_pokemons';
const firstTableName = 'trainers';
const secondTableName = 'pokemons';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id');
    table.integer('id_trainer', 64).references('id').inTable(firstTableName);
    table.integer('id_pokemon', 64).references('id').inTable(secondTableName);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
