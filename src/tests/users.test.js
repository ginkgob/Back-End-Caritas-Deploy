import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import server from "../index";
import User from "../models/User";

const api = supertest(app);

const initialUsers = [
  {
    name: "admin",
    age: 27,
    email: "test.user3@gmail.com",
    password: "password",
    roles: ["62bb170b39e57ad31699f4ed"]
  }, {
    name: "user",
    age: 19,
    email: "test.user2@gmail.com",
    password: "password",
    // roles: ['user']
  }, {
    name: "guest",
    age: 20,
    email: "test.user1@gmail.com",
    password: "password",
    // roles: ['admin'],
  }
];

const createUser = {
  name: "user4",
  age: 28,
  email: "test.user4@gmail"
}

beforeEach(async () => {
  await User.deleteMany({});
  console.log("> Users deleted in test");
    
  for (let user of initialUsers) {
    const newUser = new User(user);
    await newUser.save();
  }

  const tokenGuest = await api
    .post('/api/auth/signin')
    .send({
      email: initialUsers[0].email,
      password: initialUsers[0].password
    })
    .expect(200)
    .expect('Content-Type', /application\/json/);
  
  const tokenUser = await api
    .post('/api/auth/signin')
    .send({
      email: initialUsers[1].email,
      password: initialUsers[1].password
    })
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const tokenAdmin = await api
    .post('/api/auth/signin')
    .send({
      email: initialUsers[2].email,
      password: initialUsers[2].password
    })
    .expect(200)
    .expect('Content-Type', /application\/json/);

  return {
    tokenGuest,
    tokenUser,
    tokenAdmin
  }
});

afterAll( async () => {
  try {
    await mongoose.connection.close();
    server.close();
  } catch (err) {
    console.log(err)
  }
})

describe('users CRUD', () => {
  describe('GET /users', () => {
    test.only('should return all users', async () => {
      const response = await api
        .get('/users')
        .send({
          email: 'test.user3@gmail.com', 
          password: 'password'
        })
        .set('x-access-token', tokenAdmin.body.token)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toHaveLength(initialUsers.length);
    });

    test('should return a user', async () => {
      const response = await api
        .get('/users')
        // .auth('test.user1@gmail', 'password');
      const user = response.body[0];
      const userId = user._id;

      const userGet = await api.get(`/users/${userId}`);
      expect(userGet.body.name).toBe(user.name);
    }); 
  });

  describe('POST /users', () => {
    test('should create a new user', async () => {
      await api
        .post('/users')
        // .auth('test.user1@gmail', 'password')
        .send(createUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);
        
      const getAll = await api.get('/users');
      expect(getAll.body.length).toBe(initialUsers.length + 1);
    });
  });

  describe('PUT /users/:id', () => {
    test('should update a user', async () => {
      const response = await api
        .get('/users')
        // .auth('test.user1@gmail', 'password');
      const user = response.body[0];
      // const userId = user._id;
      console.log(user)

      const newData = {
        name: 'new name',
        age: 30,
      }
      
      const userUpdate = await api
        .put(`/users/${userId}`)
        // .auth('test.user1@gmail', 'password')
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
        // .auth('test.user1@gmail', 'password')
        .expect(200)
        .expect('Content-Type', /application\/json/);
      
      expect(userDelete.body.message).toBe('User deleted successfully');
      
      const getAll = await api.get('/users');
      expect(getAll.body.length).toBe(initialUsers.length - 1);
    });
  });
})