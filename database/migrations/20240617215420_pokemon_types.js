const tableName = 'pokemon_types';
const firstTableName = 'pokemons';
const secondTableName = 'types';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id');
    table.integer('id_pokemon', 64).references('id').inTable(firstTableName);
    table.integer('id_type', 64).references('id').inTable(secondTableName);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
