const tableName = 'trainers';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id');
    table.string('name', 64);
    table.string('description');
    table.boolean('is_deleted');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable(tableName);
};
