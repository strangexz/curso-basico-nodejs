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
    .then(() => {
      // migrations are finished
      console.info('Seeder finished!');
    });
}, 60000);

afterAll(() => {
  knex.destroy();
}, 60000);
