import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import server from "../index";
// import User from "../models/User";
// import Role from "../models/Role";

const api = supertest(app);

describe('auth verification', () => {
  const defaultAdmin = {
    email: "admin@test.com",
    password: "password"
  }

  /* const defaultUser = {
    email: "user@auth.com",
    password: "password"
  } */

  const defaultGuest = {
    email: "guest@auth.com",
    password: "password"
  }

  /* beforeEach(async () => {
    const userRole = await Role.findOne({name: 'user'});
    const guestRole = await Role.findOne({name: 'guest'});
  
    await User.deleteMany({
      // delete all users and guests
      $or: [
        {roles: {$in: [userRole._id]}},
        {roles: {$in: [guestRole._id]}},
      ]
    });
  }); */
  
  afterAll( async () => {
    try {
      await mongoose.connection.close();
      server.close();
    } catch (err) {
      console.log(err)
    }
  })

  /* test('should return 401 if no token', async () => {
    const response = await supertest(app)
      .get('/api/auth/verify')
      .expect(401)
      .expect('Content-Type', /application\/json/);
    expect(response.body.message).toBe('No token provided');
  })

  test('should return 401 if invalid token', async () => {}) */

  /* test('should return 200 if valid token', async () => {
    const response = await api
      .get('/api/auth/verify')
      .set('Authorization', `Bearer ${tokenAdmin.body.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body.message).toBe('Token is valid');
  }) */

  test('get token admin on signin should return 200 if valid credentials', async () => {
    const response = await api
      .post('/api/auth/signin')
      .send(defaultAdmin)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body.token).toBeDefined();
  })

  test('add guest should return 200 if valid credentials', async () => {
    const response = await api
      .post('/api/auth/signup')
      .send(defaultGuest)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body.message).toBeDefined();
  })

  test('get token guest on signin should return 200 if valid credentials', async () => {
    const response = await api
      .post('/api/auth/signin')
      .send(defaultGuest)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body.token).toBeDefined();
    console.log(response.body.token)
  })
})