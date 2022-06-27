import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import server from "../index";

const api = supertest(app);

describe('users CRUD', () => {
  describe('GET /users', () => {
    test('should return all users', async () => {
      await api
        .get('/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('should return a user', async () => {
      const user = await api.get('/users/62ba27d714aa7446722f10b1');
      expect(user.body.name).toBe('Marina');
    });
  });

  describe('POST /users', () => {
    test('should create a new user', async () => {
      const user = {
        name: 'Paula',
        age: 25,
        email: 'test.paula@gmail.com'
      };
      await api
        .post('/users')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });
  });

  describe('PUT /users/:id', () => {
    test('should update a user', async () => {
      const user = {
        name: 'Pol',
        age: 23,
        email: 'test.pol@gmail.com'
      };
      await api
        .put('/users/62b45259c682772f7fb307ac')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });
  });

  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });
})