const objection = require('objection');
const configuration = require('./knexfile')['test'];
const knex = require('knex')(configuration);

// console.log(configuration);

beforeAll(async () => {
  await knex.migrate
    .latest()
    .then(() => {
      jest.useRealTimers();
      return;
    })
    .then(async () => {
      // migrations are finished
      console.info('Seeder finished!');
      const c = await knex('attack_types').count('id');
      console.log('🚀 ~ .then ~ c:', c);
      // expect(knex('attack_types').count({ count: '*' })).toBeGreaterThan(0);
    });
}, 60000);

afterAll(() => {
  knex.destroy();
}, 60000);
