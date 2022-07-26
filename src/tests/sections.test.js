import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import server from  "../index";
import Section from "../models/Section";
import User from "../models/User";
import Role from "../models/Role";

const api = supertest(app);


describe('sections CRUD', () => {
  let tokenAdmin;

  const initialSections = [
    {
      title: "section1",
      text: ["p", "sleeping is important"],
      category: "sueño"
    }, {
      title: "section2",
      text: ["p", "eating is important"],
      category: "nutrición"
    }, {
      title: "section3",
      text: ["p", "doing excercice is important"],
      category: "ejercicio físico"
    }
  ];

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
    await Section.deleteMany({});
    console.log("> Sections deleted in test");
  
    for (let section of initialSections) {
      const newSection = new Section(section);
      await newSection.save();
    }
  });
  
  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });

  describe('GET /sections' , () =>{
    test('should return all sections', async () => {
      const response = await api 
        .get('/sections')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toHaveLength(initialSections.length);
    })

    test('should return all sections of a category', async () => {
      const category = "sueño";
      const response = await api 
        .get('/sections')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const filterSections = response.body.filter(section => section.category === category);
      const initialSection = initialSections.filter(section => section.category === category);

      expect(filterSections).toHaveLength(initialSection.length);
      expect(filterSections).toMatchObject(initialSection);
    })

    test('should return a specific section', async () => {
      const getAll = await api.get('/sections')
      const getSectionId = getAll.body[0]._id;

      const response = await api
        .get('/sections/' + getSectionId)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toMatchObject(initialSections[0]);
    })
  })

  describe('POST /sections', () => {
    test('should create a new section if have admin role', async () => {
      const createSection = {
        title: "section4",
        text: ["p", "sleeping is important"],
        category: "sueño"
      }

      const response = await api
        .post('/sections')
        .send(createSection)
        .set('x-access-token', tokenAdmin.body.token)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toMatchObject(createSection);
    })

    test('should not create a new section if not put token', async () => {
      const createSection = {
        title: "section4",
        text: ["p", "sleeping is important"],
        category: "sueño"
      }

      const response = await api
        .post('/sections')
        .send(createSection)
        .expect(403)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toMatchObject({
        message: "Usuario no encontrado"
      });
    })
  })
})
