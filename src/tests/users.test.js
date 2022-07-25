import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import server from "../index";
import User from "../models/User";
import Role from "../models/Role";

const api = supertest(app);

const initialUsers = [
  {
    email: "test.user2@gmail.com",
    password: "password",
  }, {
    email: "test.user1@gmail.com",
    password: "password",
  }
];

/* const createUser = {
  name: "user4",
  age: 28,
  email: "test.user4@gmail"
} */


describe('users CRUD', () => {
  let tokenAdmin;

  beforeAll(async () => {
    const userRole = await Role.findOne({name: 'user'});
    const guestRole = await Role.findOne({name: 'guest'});
  
    await User.deleteMany({
      $or: [
        {roles: {$in: [userRole._id]}},
        {roles: {$in: [guestRole._id]}},
      ]
    });
    console.log("> Users deleted in test beforeAll");

    tokenAdmin = await api
      .post('/api/auth/signin')
      .send({
        email: 'admin@test.com',
        password: 'password'
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);
  
    console.log(tokenAdmin)
    console.log(tokenAdmin.body.token)
    
    return tokenAdmin;
  });

  beforeEach(async () => {
    const userRole = await Role.findOne({name: 'user'});
    const guestRole = await Role.findOne({name: 'guest'});
  
    await User.deleteMany({
      // delete all users and guests
      $or: [
        {roles: {$in: [userRole._id]}},
        {roles: {$in: [guestRole._id]}},
      ]
    });
    console.log("> Users deleted in test beforeEach");

    // register initialUsers
    initialUsers.forEach(async (user) => {
      await api
        .post('/api/auth/signup')
        .send(user)
        .set('x-access-token', tokenAdmin.body.token)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });
  });
  
  afterAll( async () => {
    try {
      await mongoose.connection.close();
      server.close();
    } catch (err) {
      console.log(err)
    }
  })

  describe('GET /users', () => {
    test.only('should return all users', async () => {
      const response = await api
        .get('/users')
        /* .send({
          email: 'test.user3@gmail.com', 
          password: 'password'
        }) */
        .set('x-access-token', tokenAdmin.body.token)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toHaveLength(initialUsers.length + 1);
    });

    /* test('should return a user', async () => {
      const response = await api
        .get('/users')
        // .auth('test.user1@gmail', 'password');
      const user = response.body[0];
      const userId = user._id;

      const userGet = await api.get(`/users/${userId}`);
      expect(userGet.body.name).toBe(user.name);
    });  */
  });

  /* describe('POST /users', () => {
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
  }); */
})