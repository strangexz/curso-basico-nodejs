const tableName = 'types';
const foreignTableName = 'attack_types'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id');
    table.string('name', 64);
    table.integer('id_attack_type').unsigned();
    table.foreign('id_attack_type').references('id').inTable(foreignTableName);
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
