const tableName = 'pokemon_moves';
const firstTableName = 'pokemons';
const secondTableName = 'moves';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.integer('id_pokemon', 64).references('id').inTable(firstTableName);
    table.integer('id_move', 64).references('id').inTable(secondTableName);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
