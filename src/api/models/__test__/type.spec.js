const { faker, it } = require('@faker-js/faker');

const Type = require('../type');

const types = [];

for (let i = 0; i < 5; i++) {
  const element = {
    name: faker.commerce.product(),
    idAttackType: faker.number.int({ min: 1, max: 5 }),
    isDeleted: faker.datatype.boolean(),
  };

  types.push(element);
}

describe('Types model unit test', () => {
  describe.each([
    ['1st', types[0]],
    ['2nd', types[1]],
    ['3rd', types[2]],
    ['4th', types[3]],
    ['5th', types[4]],
  ])(
    'double(%d)',
    (input, expected) => {
      test(`returns ${expected}`, () => {
        expect(double(input)).toBe(expected);
      });
    }
  );

});
