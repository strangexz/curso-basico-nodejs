const _ = require('underscore');

const { getAttackTypesService } = require('../attackType.service');

describe('Attack type services tests', () => {
  describe('getAttackTypesService tests', () => {
    describe('when get a successfully response', () => {
      it('should be return all attack types', async () => {
        const response = await getAttackTypesService();
        console.log("🚀 ~ it ~ response:", response)

        expect(response.isOk).toBeDefined();
        expect(response.isOk).toBeFalsy();
        expect(response.data).toBeDefined();
        for (const attackType of response.data) {
          expect(attackType.id).toBeDefined();
          expect(attackType.id).toEqual(expect.any(Number));
          expect(attackType.type).toBeDefined();
          expect(attackType.type).toEqual(expect.any(String));
          expect(attackType.isDeleted).toBeDefined();
          expect(attackType.isDeleted).toEqual(expect.any(Boolean));
          expect(attackType.createdAt).toBeDefined();
          expect(attackType.createdAt).toEqual(expect.any(String));
          expect(attackType.updatedAt).toBeDefined();
          expect(attackType.updatedAt).toEqual(expect.any(String));
        }

        expect(response.error).toBeDefined();
        expect.stringContaining(response.error);
      });
    });

    describe('when get a unsuccessfully response', () => {});
  });
});
