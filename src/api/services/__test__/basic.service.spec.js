const validator = require('validator');
const _ = require('underscore');

const operations = require('../../../data/data.json');
const { getOperations, getOperation, postAddition, putMultiply, deleteDivision } = require('../basic.service');

describe('Basic service tests', () => {
  describe('getOperations service tests', () => {
    describe('when get a successfully response', () => {
      it('should be get all operations successfully', () => {
        const methods = [];
        const response = getOperations(methods);

        expect(response.isOk).toBeDefined();
        expect(response.isOk).toBeTruthy();
        expect(response.data).toBeDefined();
        expect(response.data).toMatchObject(operations);
        expect(response.error).toBeDefined();
        expect(response.error).toBeNull();
      });

      it('should be get an specific operation successfully', () => {
        const methods = ['get'];
        const response = getOperations(methods);

        expect(response.isOk).toBeDefined();
        expect(response.isOk).toBeTruthy();
        expect(response.data).toBeDefined();
        for (const method of methods) {
          expect(response.data).toHaveProperty(method, operations[method]);
        }
        expect(response.error).toBeDefined();
        expect(response.error).toBeNull();
      });

      it('should be get the specifics operation successfully', () => {
        const methods = ['get', 'put', 'delete'];
        const response = getOperations(methods);

        expect(response.isOk).toBeDefined();
        expect(response.isOk).toBeTruthy();
        expect(response.data).toBeDefined();
        for (const method of methods) {
          expect(response.data).toHaveProperty(method, operations[method]);
        }
        expect(response.error).toBeDefined();
        expect(response.error).toBeNull();
      });
    });

    describe('when get a unsuccessfully response', () => {
      it('should be get an error', () => {
        const methods = 'get, post, delete, put';
        const response = getOperations(methods);

        expect(response.isOk).toBeDefined();
        expect(response.isOk).toBeFalsy();
        expect(response.data).toBeDefined();
        expect(response.data).toBeNull();
        expect(response.error).toBeDefined();
        expect.stringContaining(response.error);
      });
    });
  });

  describe('getOperation service tests', () => {
    describe('when get a successfully response', () => {
      it('should be get an specific operation successfully', () => {
        const method = 'post';
        const response = getOperation(method);

        expect(response.isOk).toBeDefined();
        expect(response.isOk).toBeTruthy();
        expect(response.data).toBeDefined();
        expect(response.data).toHaveProperty(method, operations[method]);
        expect(response.error).toBeDefined();
        expect(response.error).toBeNull();
      });
    });

    describe('when get a unsuccessfully response', () => {
      it('should be get an error', () => {
        const method = 'posteo';
        const response = getOperation(method);

        expect(response.isOk).toBeDefined();
        expect(response.isOk).toBeFalsy();
        expect(response.data).toBeDefined();
        expect(response.data).toBeNull();
        expect(response.error).toBeDefined();
        expect.stringContaining(response.error);
      });
    });
  });

  describe('postAddition service tests', () => {
    describe('when get a successfully response', () => {
      it('should get the total addition successfully', () => {
        const number1 = 2;
        const number2 = 3;

        const response = postAddition(number1, number2);

        expect(response.isOk).toBeDefined();
        expect(response.isOk).toBeTruthy();
        expect(response.data).toBeDefined();
        expect(response.data).toHaveProperty('number1', number1);
        expect(response.data).toHaveProperty('number2', number2);
        expect(response.data).toHaveProperty('total', 5);
        expect(response.error).toBeDefined();
        expect(response.error).toBeNull();
      });
    });

    describe('when get a unsuccessfully response', () => {
      it('should be get an error if we sent a non-number', () => {
        const number1 = 'dos';
        const number2 = 3;

        const response = postAddition(number1, number2);

        expect(response.isOk).toBeDefined();
        expect(response.isOk).toBeFalsy();
        expect(response.data).toBeDefined();
        expect(response.data).toHaveProperty('number1', number1);
        expect(response.data).toHaveProperty('number2', number2);
        expect(response.data).toHaveProperty('total', NaN);
        expect(response.error).toBeDefined();
        expect.stringContaining(response.error);
      });

      it('should be get an error if we sent a non-number too', () => {
        const number1 = 'dos';
        const number2 = 'tres';

        const response = postAddition(number1, number2);

        expect(response.isOk).toBeDefined();
        expect(response.isOk).toBeFalsy();
        expect(response.data).toBeDefined();
        expect(response.data).toHaveProperty('number1', number1);
        expect(response.data).toHaveProperty('number2', number2);
        expect(response.data).toHaveProperty('total', NaN);
        expect(response.error).toBeDefined();
        expect.stringContaining(response.error);
      });
    });
  });

  describe('putMultiply service tests', () => {
    describe('when get a successfully response', () => {
      it('should get the product successfully', () => {
        const number1 = 2;
        const number2 = 3;
        const getRemainder = false;

        const response = putMultiply(number1, number2, getRemainder);

        expect(response.isOk).toBeDefined();
        expect(response.isOk).toBeTruthy();
        expect(response.data).toBeDefined();
        expect(response.data).toHaveProperty('number1', number1);
        expect(response.data).toHaveProperty('number2', number2);
        expect(response.data).toHaveProperty('product', 6);
        expect(response.error).toBeDefined();
        expect(response.error).toBeNull();
      });
    });

    describe('when get a unsuccessfully response', () => {
      it('should be get an error if we sent a non-number', () => {
        const number1 = 'dos';
        const number2 = 3;
        const getRemainder = false;

        const response = putMultiply(number1, number2, getRemainder);

        expect(response.isOk).toBeDefined();
        expect(response.isOk).toBeFalsy();
        expect(response.data).toBeDefined();
        expect(response.data).toHaveProperty('number1', number1);
        expect(response.data).toHaveProperty('number2', number2);
        expect(response.data).toHaveProperty('product', NaN);
        expect(response.error).toBeDefined();
        expect.stringContaining(response.error);
      });

      it('should be get an error if we sent a non-number too', () => {
        const number1 = 'dos';
        const number2 = 'tres';
        const getRemainder = false;

        const response = putMultiply(number1, number2, getRemainder);

        expect(response.isOk).toBeDefined();
        expect(response.isOk).toBeFalsy();
        expect(response.data).toBeDefined();
        expect(response.data).toHaveProperty('number1', number1);
        expect(response.data).toHaveProperty('number2', number2);
        expect(response.data).toHaveProperty('product', NaN);
        expect(response.error).toBeDefined();
        expect.stringContaining(response.error);
      });
    });
  });

  describe('deleteDivision service tests', () => {
    describe('when get a successfully response', () => {
      it('should get the quotient successfully', () => {
        const number1 = 6;
        const number2 = 3;
        const getRemainder = false;

        const response = deleteDivision(number1, number2, getRemainder);

        expect(response.isOk).toBeDefined();
        expect(response.isOk).toBeTruthy();
        expect(response.data).toBeDefined();
        expect(response.data).toHaveProperty('number1', number1);
        expect(response.data).toHaveProperty('number2', number2);
        expect(response.data).toHaveProperty('quotient', 2);
        expect(response.error).toBeDefined();
        expect(response.error).toBeNull();
      });

      it('should get the quotient successfully too', () => {
        const number1 = 6;
        const number2 = 3;
        const getRemainder = true;

        const response = deleteDivision(number1, number2, getRemainder);

        expect(response.isOk).toBeDefined();
        expect(response.isOk).toBeTruthy();
        expect(response.data).toBeDefined();
        expect(response.data).toHaveProperty('number1', number1);
        expect(response.data).toHaveProperty('number2', number2);
        expect(response.data).toHaveProperty('remainder', 0);
        expect(response.error).toBeDefined();
        expect(response.error).toBeNull();
      });
    });

    describe('when get a unsuccessfully response', () => {
      it('should be get an error if the divisor is zero (0)', () => {
        const number1 = 3;
        const number2 = 0;
        const getRemainder = false;

        const response = deleteDivision(number1, number2, getRemainder);

        expect(response.isOk).toBeDefined();
        expect(response.isOk).toBeFalsy();
        expect(response.data).toBeDefined();
        expect(response.data).toHaveProperty('number1', number1);
        expect(response.data).toHaveProperty('number2', number2);
        expect(response.data).toHaveProperty('quotient', Infinity);
        expect(response.error).toBeDefined();
        expect.stringContaining(response.error);
      });

      it('should be get an error if the divisor is zero (0)', () => {
        const number1 = 3;
        const number2 = 0;
        const getRemainder = true;

        const response = deleteDivision(number1, number2, getRemainder);

        expect(response.isOk).toBeDefined();
        expect(response.isOk).toBeFalsy();
        expect(response.data).toBeDefined();
        expect(response.data).toHaveProperty('number1', number1);
        expect(response.data).toHaveProperty('number2', number2);
        expect(response.data).toHaveProperty('remainder', NaN);
        expect(response.error).toBeDefined();
        expect.stringContaining(response.error);
      });

      it('should be get an error if the divisor is non-number', () => {
        const number1 = 3;
        const number2 = 'zero';
        const getRemainder = false;

        const response = deleteDivision(number1, number2, getRemainder);

        expect(response.isOk).toBeDefined();
        expect(response.isOk).toBeFalsy();
        expect(response.data).toBeDefined();
        expect(response.data).toHaveProperty('number1', number1);
        expect(response.data).toHaveProperty('number2', number2);
        expect(response.data).toHaveProperty('quotient', NaN);
        expect(response.error).toBeDefined();
        expect.stringContaining(response.error);
      });
    });
  });
});
