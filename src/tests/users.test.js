import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import server from "../index";
import User from "../models/User";
import Role from "../models/Role";

const api = supertest(app);

describe('users CRUD', () => {
  let tokenAdmin;
  let tokenUser;

  const initialUsers = [
    {
      email: "test.user@gmail.com",
      password: "password",
    }, {
      email: "test.guest@gmail.com",
      password: "password",
    }
  ];

  const updateUser = {
    name: "user",
    surname: "update",
    age: 28,
    email: "update.user@gmail.com"
  }

  beforeAll(async () => {
    const userRole = await Role.findOne({name: 'user'});
    const guestRole = await Role.findOne({name: 'guest'});
  
    await User.deleteMany({
      $or: [
        {roles: {$in: [userRole._id]}},
        {roles: {$in: [guestRole._id]}},
      ]
    });

    tokenAdmin = await api
      .post('/api/auth/signin')
      .send({
        email: 'admin@test.com',
        password: 'password'
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);
    
    return tokenAdmin;
  });

  beforeEach(async () => {
    const userRole = await Role.findOne({name: 'user'});
    const guestRole = await Role.findOne({name: 'guest'});
  
    await User.deleteMany({
      $or: [
        {roles: {$in: [userRole._id]}},
        {roles: {$in: [guestRole._id]}},
      ]
    });
    
    initialUsers.forEach(async (user) => {
      await api
        .post('/api/auth/signup')
        .send(user)
        .set('x-access-token', tokenAdmin.body.token)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    const getAllUsers = await api
      .get('/users')
      .set('x-access-token', tokenAdmin.body.token);

    const getUser = getAllUsers.body[1];

    await api
      .put(`/users/${getUser._id}`)
      .send({
        roles: [await Role.find({name: 'user'})]
      })
      .set('x-access-token', tokenAdmin.body.token);
    
    try {
      tokenUser = await api
        .post('/api/auth/signin')
        .send({
          email: initialUsers[0].email,
          password: initialUsers[0].password
        })
        .expect(200)
        .expect('Content-Type', /application\/json/);
      console.log(tokenUser.body.token)
    } catch (error) {
      console.log(error)
    }

    // get token for guest
    /* tokenGuest = await api
      .post('/api/auth/signin')
      .send({
        email: initialUsers[1].email,
        password: initialUsers[1].password
      })
      .expect(200)
      .expect('Content-Type', /application\/json/); */
    // console.log(tokenGuest)
    // console.log(tokenGuest.body.token)

    return {
      tokenUser,
      // tokenGuest
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

  describe('GET /users', () => {
    test('should return all users (role admin)', async () => {
      const response = await api
        .get('/users')
        .set('x-access-token', tokenAdmin.body.token)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toHaveLength(initialUsers.length + 1);
    });

    test('should return a user (role admin)', async () => {
      const getAllUsers = await api
        .get('/users')
        .set('x-access-token', tokenAdmin.body.token);
      
      const getUser = getAllUsers.body[1];
      
      const response = await api
        .get(`/users/${getUser._id}`)
        .set('x-access-token', tokenAdmin.body.token)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toMatchObject(getUser);
    }); 
  });

  /* describe('POST /users', () => {
    test('should create a new user', async () => {
      await api
        .post('/users')
        .send(createUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);
        
      const getAll = await api.get('/users');
      expect(getAll.body.length).toBe(initialUsers.length + 1);
    });
  }); */

  describe('PUT /users/:id', () => {
    test('should update a user (role admin)', async () => {
      const getAllUsers = await api
        .get('/users')
        .set('x-access-token', tokenAdmin.body.token);

      const getUser = getAllUsers.body[1];

      const response = await api
        .put(`/users/${getUser._id}`)
        .send(updateUser)
        .set('x-access-token', tokenAdmin.body.token)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      
      expect(response.body.message).toBe('El usuario ha sido actualizado');
      
      expect(getAllUsers.body.length).toBe(initialUsers.length + 1);
    });

    test('should update a user (role user)', async () => {
      const getAllUsers = await api
        .get('/users')
        .set('x-access-token', tokenAdmin.body.token);

      const getUser = getAllUsers.body[1];

      const response = await api
        .put(`/users/${getUser._id}`)
        .send({
          name: 'update',
          surname: 'user',
          roles: [await Role.find({name: 'user'})]
        })
        .set('x-access-token', tokenUser.body.token)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      
      expect(response.body.message).toBe('El usuario ha sido actualizado');
      
      expect(getAllUsers.body.length).toBe(initialUsers.length + 1);
    });
  });

  /* describe('DELETE /users/:id', () => {
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