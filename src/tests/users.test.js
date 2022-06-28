import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import server from "../index";
import User from "../models/User";

const api = supertest(app);

const initialUsers = [
  {
    name: "user1",
    age: 20,
    email: "test.user1@gmail"
  }, {
    name: "user2",
    age: 19,
    email: "test.user2@gmail"
  }, {
    name: "user3",
    age: 27,
    email: "test.user3@gmail"
  }
];

const createUser = {
  name: "user4",
  age: 28,
  email: "test.user4@gmail"
}

beforeEach(async () => {
  await User.deleteMany({});

  const user = new User(initialUsers[0]);
  await user.save();
  const user2 = new User(initialUsers[1]);
  await user2.save();
  const user3 = new User(initialUsers[2]);
  await user3.save();
});

describe('users CRUD', () => {
  describe('GET /users', () => {
    test('should return all users', async () => {
      const response = await api
        .get('/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body.length).toBe(initialUsers.length);
    });

    test('should return a user', async () => {
      const response = await api.get('/users');
      const user = response.body[0];
      const userId = user._id;

      const userGet = await api.get(`/users/${userId}`);
      expect(userGet.body.name).toBe('user1');
    }); 
  });

  describe('POST /users', () => {
    test('should create a new user', async () => {
      await api
        .post('/users')
        .send(createUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);
        
      const getAll = await api.get('/users');
      expect(getAll.body.length).toBe(initialUsers.length + 1);
    });
  });

  describe('PUT /users/:id', () => {
    test('should update a user', async () => {
      const response = await api.get('/users');
      const user = response.body[0];
      const userId = user._id;

      const newData = {
        name: 'new name',
        age: 30,
      }
      
      const userUpdate = await api
        .put(`/users/${userId}`)
        .send(newData)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      
      expect(userUpdate.body.message).toBe('User updated successfully');
      
      const getAll = await api.get('/users');
      expect(getAll.body.length).toBe(initialUsers.length);
    });
  });

  describe('DELETE /users/:id', () => {
    test('should delete a user', async () => {
      const response = await api.get('/users');
      const user = response.body[0];
      const userId = user._id;

      const userDelete = await api
        .delete(`/users/${userId}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      
      expect(userDelete.body.message).toBe('User deleted successfully');
      
      const getAll = await api.get('/users');
      expect(getAll.body.length).toBe(initialUsers.length - 1);
    });
  });

  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });
})