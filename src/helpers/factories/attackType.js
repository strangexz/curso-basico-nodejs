const { faker } = require('@faker-js/faker');
const { Factory } = require('rosie');

const attackTypes = Factory.define('attack_types')
  .sequence('id')
  .attr('type', faker.company.buzzNoun())
  .attr('is_deleted', faker.datatype.boolean())
  .attr('created_at', faker.date.recent({ days: 10 }))
  .attr('updated_at', faker.date.recent({ days: 3 }));

module.exports = attackTypes;
