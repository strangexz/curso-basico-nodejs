const tableName = 'moves';
const foreignTableName = 'types';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.string('name', 64);
    table.string('description');
    table.integer('power');
    table.integer('precision');
    table.integer('pp');
    table.integer('id_type').unsigned();
    table.foreign('id_type').references('id').inTable(foreignTableName);
    table.integer('priority');
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
