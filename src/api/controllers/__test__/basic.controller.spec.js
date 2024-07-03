const request = require('supertest');

const operations = require('../../../data/data.json');
const app = require('../../../index');

describe('Basic endpoints integration test', () => {
  describe('GET /basic', () => {
    describe('/getAllOperations', () => {
      describe('when the request is success and return OK', () => {
        it('should be return all the operations', async () => {
          const res = await request(app).get('/nodeCourse/basic/getAllOperations');

          expect(res.statusCode).toBe(200);
          expect(res.body.isOk).toBeDefined();
          expect(res.body.isOk).toBeTruthy();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(expect.any(String));
          expect(res.body.result).toBeDefined();
          expect(res.body.result).toMatchObject(operations);
        });

        it('should be return the specific operations we want', async () => {
          const queryParams = { methods: ['get', 'post', 'delete'] };

          const res = await request(app).get('/nodeCourse/basic/getAllOperations').query(queryParams);

          expect(res.statusCode).toBe(200);
          expect(res.body.isOk).toBeDefined();
          expect(res.body.isOk).toBeTruthy();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(expect.any(String));
          expect(res.body.result).toBeDefined();
          for (const method of queryParams.methods) {
            expect(res.body.result).toHaveProperty(method, operations[method]);
          }
        });
      });

      describe('when the request failed', () => {
        it('should be return an error because we sent a not valid method', async () => {
          const queryParams = { methods: ['get', 'postear', 'delete'] };

          const res = await request(app).get('/nodeCourse/basic/getAllOperations').query(queryParams);

          expect(res.statusCode).toBe(400);
          expect(res.body.isOk).toBeDefined();
          expect(res.body.isOk).toBeFalsy();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(expect.any(String));
          expect(res.body.result).toBeDefined();
          expect(res.body.result.methods).toBeDefined();
          expect(res.body.result).toMatchObject(queryParams);
        });
      });
    });

    describe('/getOneOperation', () => {
      describe('when the request is success and return OK', () => {
        it('should be return the specific operation', async () => {
          const method = 'post';
          const res = await request(app).get('/nodeCourse/basic/getOneOperation/' + method);

          expect(res.statusCode).toBe(200);
          expect(res.body.isOk).toBeDefined();
          expect(res.body.isOk).toBeTruthy();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(expect.any(String));
          expect(res.body.result).toBeDefined();
          expect(res.body.result).toHaveProperty(method, operations[method]);
        });
      });

      describe('when the request failed', () => {
        it('should be return the specific operation', async () => {
          const method = 'posteo';
          const res = await request(app).get('/nodeCourse/basic/getOneOperation/' + method);

          expect(res.statusCode).toBe(400);
          expect(res.body.isOk).toBeDefined();
          expect(res.body.isOk).toBeFalsy();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(expect.any(String));
          expect(res.body.result).toBeDefined();
          expect(res.body.result).toHaveProperty('method', method);
        });
      });
    });
  });

  describe('POST /basic', () => {
    describe('/postAddition', () => {
      describe('when the request is success and return OK', () => {
        it('should be return the total of two numbers', async () => {
          const bodyRequest = {
            num1: 1,
            num2: 2,
          };
          const res = await request(app)
            .post('/nodeCourse/basic/postAddition')
            .send(bodyRequest)
            .set('Accept', 'application/json');

          expect(res.statusCode).toBe(200);
          expect(res.body.isOk).toBeDefined();
          expect(res.body.isOk).toBeTruthy();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(expect.any(String));
          expect(res.body.result).toBeDefined();
          expect(res.body.result).toHaveProperty('number1', bodyRequest.num1);
          expect(res.body.result).toHaveProperty('number2', bodyRequest.num2);
          expect(res.body.result).toHaveProperty('total', 3);
        });

        it('should be return the total of two numbers too', async () => {
          const bodyRequest = {
            num1: '1',
            num2: 2,
          };
          const res = await request(app)
            .post('/nodeCourse/basic/postAddition')
            .send(bodyRequest)
            .set('Accept', 'application/json');

          expect(res.statusCode).toBe(200);
          expect(res.body.isOk).toBeDefined();
          expect(res.body.isOk).toBeTruthy();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(expect.any(String));
          expect(res.body.result).toBeDefined();
          expect(res.body.result).toHaveProperty('number1', bodyRequest.num1);
          expect(res.body.result).toHaveProperty('number2', bodyRequest.num2);
          expect(res.body.result).toHaveProperty('total', 3);
        });
      });

      describe('when the request failed', () => {
        it("should be return an error because we don't sent the first param", async () => {
          const bodyRequest = {
            num2: 2,
          };
          const res = await request(app)
            .post('/nodeCourse/basic/postAddition')
            .send(bodyRequest)
            .set('Accept', 'application/json');

          expect(res.statusCode).toBe(400);
          expect(res.body.isOk).toBeDefined();
          expect(res.body.isOk).toBeFalsy();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(expect.any(String));
          expect(res.body.result).toBeDefined();
          expect(res.body.result).toBeNull();
        });

        it("should be return an error because we don't sent the second param", async () => {
          const bodyRequest = {
            num1: 2,
          };
          const res = await request(app)
            .post('/nodeCourse/basic/postAddition')
            .send(bodyRequest)
            .set('Accept', 'application/json');

          expect(res.statusCode).toBe(400);
          expect(res.body.isOk).toBeDefined();
          expect(res.body.isOk).toBeFalsy();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(expect.any(String));
          expect(res.body.result).toBeDefined();
          expect(res.body.result).toBeNull();
        });

        it('should be return an error because we sent a non-number value', async () => {
          const bodyRequest = {
            num1: 1,
            num2: 'dos',
          };
          const res = await request(app)
            .post('/nodeCourse/basic/postAddition')
            .send(bodyRequest)
            .set('Accept', 'application/json');

          expect(res.statusCode).toBe(400);
          expect(res.body.isOk).toBeDefined();
          expect(res.body.isOk).toBeFalsy();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(expect.any(String));
          expect(res.body.result).toBeDefined();
          expect(res.body.result).toBeNull();
        });
      });
    });
  });

  describe('PUT /basic', () => {
    describe('/putMultiply', () => {
      describe('when the request is success and return OK', () => {
        it('should be return the product of two numbers', async () => {
          const bodyRequest = {
            num1: 3,
            num2: 2,
          };
          const res = await request(app)
            .put('/nodeCourse/basic/putMultiply')
            .send(bodyRequest)
            .set('Accept', 'application/json');

          expect(res.statusCode).toBe(200);
          expect(res.body.isOk).toBeDefined();
          expect(res.body.isOk).toBeTruthy();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(expect.any(String));
          expect(res.body.result).toBeDefined();
          expect(res.body.result).toBeNull();
        });

        it('should be return the product of two numbers too', async () => {
          const bodyRequest = {
            num1: '3',
            num2: 4,
          };
          const res = await request(app)
            .put('/nodeCourse/basic/putMultiply')
            .send(bodyRequest)
            .set('Accept', 'application/json');

          expect(res.statusCode).toBe(200);
          expect(res.body.isOk).toBeDefined();
          expect(res.body.isOk).toBeTruthy();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(expect.any(String));
          expect(res.body.result).toBeDefined();
          expect(res.body.result).toBeNull();
        });
      });

      describe('when the request failed', () => {
        it("should be return an error because we don't sent the first param", async () => {
          const bodyRequest = {
            num2: 2,
          };
          const res = await request(app)
            .put('/nodeCourse/basic/putMultiply')
            .send(bodyRequest)
            .set('Accept', 'application/json');

          expect(res.statusCode).toBe(400);
          expect(res.body.isOk).toBeDefined();
          expect(res.body.isOk).toBeFalsy();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(expect.any(String));
          expect(res.body.result).toBeDefined();
          expect(res.body.result).toBeNull();
        });

        it("should be return an error because we don't sent the second param", async () => {
          const bodyRequest = {
            num1: 2,
          };
          const res = await request(app)
            .put('/nodeCourse/basic/putMultiply')
            .send(bodyRequest)
            .set('Accept', 'application/json');

          expect(res.statusCode).toBe(400);
          expect(res.body.isOk).toBeDefined();
          expect(res.body.isOk).toBeFalsy();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(expect.any(String));
          expect(res.body.result).toBeDefined();
          expect(res.body.result).toBeNull();
        });

        it('should be return an error because we sent a non-number value', async () => {
          const bodyRequest = {
            num1: 1,
            num2: 'dos',
          };
          const res = await request(app)
            .put('/nodeCourse/basic/putMultiply')
            .send(bodyRequest)
            .set('Accept', 'application/json');

          expect(res.statusCode).toBe(400);
          expect(res.body.isOk).toBeDefined();
          expect(res.body.isOk).toBeFalsy();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(expect.any(String));
          expect(res.body.result).toBeDefined();
          expect(res.body.result).toBeNull();
        });
      });
    });
  });

  describe('DELETE /basic', () => {
    describe('/deleteDivision', () => {
      describe('when the request is success and return OK', () => {
        it('should be return the quotient of a division', async () => {
          const bodyRequest = {
            num1: 6,
            num2: 2,
          };

          const res = await request(app)
            .delete('/nodeCourse/basic/deleteDivision')
            .send(bodyRequest)
            .set('Accept', 'application/json');

          expect(res.statusCode).toBe(200);
          expect(res.body.isOk).toBeDefined();
          expect(res.body.isOk).toBeTruthy();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(expect.any(String));
          expect(res.body.result).toBeDefined();
          expect(res.body.result).toHaveProperty('number1', bodyRequest.num1);
          expect(res.body.result).toHaveProperty('number2', bodyRequest.num2);
          expect(res.body.result).toHaveProperty('quotient', 3);
        });

        it('should be return the quotient of a division too', async () => {
          const bodyRequest = {
            num1: '12',
            num2: 4,
          };
          const queryParams = { getRemainder: false };

          const res = await request(app)
            .delete('/nodeCourse/basic/deleteDivision')
            .send(bodyRequest)
            .query(queryParams)
            .set('Accept', 'application/json');

          expect(res.statusCode).toBe(200);
          expect(res.body.isOk).toBeDefined();
          expect(res.body.isOk).toBeTruthy();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(expect.any(String));
          expect(res.body.result).toBeDefined();
          expect(res.body.result).toHaveProperty('number1', bodyRequest.num1);
          expect(res.body.result).toHaveProperty('number2', bodyRequest.num2);
          expect(res.body.result).toHaveProperty('quotient', 3);
        });

        it('should be return the remainder of a division', async () => {
          const bodyRequest = {
            num1: 6,
            num2: 2,
          };
          const queryParams = { getRemainder: true };

          const res = await request(app)
            .delete('/nodeCourse/basic/deleteDivision')
            .send(bodyRequest)
            .query(queryParams)
            .set('Accept', 'application/json');

          expect(res.statusCode).toBe(200);
          expect(res.body.isOk).toBeDefined();
          expect(res.body.isOk).toBeTruthy();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(expect.any(String));
          expect(res.body.result).toBeDefined();
          expect(res.body.result).toHaveProperty('number1', bodyRequest.num1);
          expect(res.body.result).toHaveProperty('number2', bodyRequest.num2);
          expect(res.body.result).toHaveProperty('remainder', 0);
        });

        it('should be return the remainder of a division too', async () => {
          const bodyRequest = {
            num1: '12',
            num2: 4,
          };
          const queryParams = { getRemainder: true };

          const res = await request(app)
            .delete('/nodeCourse/basic/deleteDivision')
            .send(bodyRequest)
            .query(queryParams)
            .set('Accept', 'application/json');

          expect(res.statusCode).toBe(200);
          expect(res.body.isOk).toBeDefined();
          expect(res.body.isOk).toBeTruthy();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(expect.any(String));
          expect(res.body.result).toBeDefined();
          expect(res.body.result).toHaveProperty('number1', bodyRequest.num1);
          expect(res.body.result).toHaveProperty('number2', bodyRequest.num2);
          expect(res.body.result).toHaveProperty('remainder', 0);
        });
      });

      describe('when the request failed', () => {
        it("should be return an error because we don't sent the first param", async () => {
          const bodyRequest = {
            num2: 2,
          };
          const res = await request(app)
            .delete('/nodeCourse/basic/deleteDivision')
            .send(bodyRequest)
            .set('Accept', 'application/json');

          expect(res.statusCode).toBe(400);
          expect(res.body.isOk).toBeDefined();
          expect(res.body.isOk).toBeFalsy();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(expect.any(String));
          expect(res.body.result).toBeDefined();
          expect(res.body.result).toBeNull();
        });

        it("should be return an error because we don't sent the second param", async () => {
          const bodyRequest = {
            num1: 4,
          };
          const res = await request(app)
            .delete('/nodeCourse/basic/deleteDivision')
            .send(bodyRequest)
            .set('Accept', 'application/json');

          expect(res.statusCode).toBe(400);
          expect(res.body.isOk).toBeDefined();
          expect(res.body.isOk).toBeFalsy();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(expect.any(String));
          expect(res.body.result).toBeDefined();
          expect(res.body.result).toBeNull();
        });

        it('should be return an error because we sent a non-number value', async () => {
          const bodyRequest = {
            num1: 1,
            num2: 'dos',
          };
          const res = await request(app)
            .delete('/nodeCourse/basic/deleteDivision')
            .send(bodyRequest)
            .set('Accept', 'application/json');

          expect(res.statusCode).toBe(400);
          expect(res.body.isOk).toBeDefined();
          expect(res.body.isOk).toBeFalsy();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(expect.any(String));
          expect(res.body.result).toBeDefined();
          expect(res.body.result).toBeNull();
        });

        it('should be return an error because the second param is zero', async () => {
          const bodyRequest = {
            num1: 1,
            num2: 0,
          };
          const res = await request(app)
            .delete('/nodeCourse/basic/deleteDivision')
            .send(bodyRequest)
            .set('Accept', 'application/json');

          expect(res.statusCode).toBe(400);
          expect(res.body.isOk).toBeDefined();
          expect(res.body.isOk).toBeFalsy();
          expect(res.body.message).toBeDefined();
          expect(res.body.message).toEqual(expect.any(String));
          expect(res.body.result).toBeDefined();
          expect(res.body.result).toBeNull();
        });
      });
    });
  });
});
