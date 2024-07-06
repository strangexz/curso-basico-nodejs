const { faker } = require('@faker-js/faker');

const AttackType = require('../attackTypes');

const attackTypes = [];

for (let i = 0; i < 5; i++) {
  const element = {
    type: faker.company.buzzNoun(),
    isDeleted: faker.datatype.boolean(),
  };

  attackTypes.push(element);
}

describe('Attack types model unit test', () => {
  describe.each([
    ['1st', attackTypes[0]],
    ['2nd', attackTypes[1]],
    ['3rd', attackTypes[2]],
    ['4th', attackTypes[3]],
    ['5th', attackTypes[4]],
  ])('#%s Attack types', (input, expected) => {
    let newAttackType;
    let { type, isDeleted } = expected;

    beforeAll(async () => {
      newAttackType = await AttackType.query().insert(expected);
    });

    it('should have an id attribute', () => {
      expect(newAttackType.id).toBeDefined();
      expect(newAttackType.id).toEqual(expect.any(Number));
    });

    it('should have a type attribute', () => {
      expect(newAttackType.type).toBeDefined();
      expect(newAttackType.type).toEqual(expect.any(String));
      expect(newAttackType.type).toBe(type);
    });

    it('should have a isDeleted attribute', () => {
      expect(newAttackType.isDeleted).toBeDefined();
      expect(newAttackType.isDeleted).toEqual(expect.any(Boolean));
      expect(newAttackType.isDeleted).toBe(isDeleted);
    });

    it('should have a createdAt attribute', () => {
      expect(newAttackType.createdAt).toBeDefined();
      expect(newAttackType.createdAt).toEqual(expect.any(String));
    });
  });
});
