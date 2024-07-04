const _ = require('underscore');

const { getAttackTypesService } = require('../attackType.service');

describe('Attack type services tests', () => {
  describe('getAttackTypesService tests', () => {
    describe('when get a successfully response', () => {
      it('should be return all attack types', async () => {
        const response = getAttackTypesService();

        expect(response.isOk).toBeDefined();
        expect(response.isOk).toBeFalsy();
        expect(response.data).toBeDefined();

        expect(response.error).toBeDefined();
        expect.stringContaining(response.error);

      });
    });

    describe('when get a unsuccessfully response', () => {

    });

  });

});
