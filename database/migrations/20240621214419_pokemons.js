const tableName = 'pokemons';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id');
    table.string('name', 64);
    table.string('description');
    table.integer('ps');
    table.integer('attack');
    table.integer('defense');
    table.integer('speed');
    table.integer('height');
    table.integer('weight');
    table.integer('special');
    table.boolean('is_deleted');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
