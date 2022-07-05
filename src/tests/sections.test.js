import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import server from  "../index";
import Section from "../models/Section";

const api = supertest(app);

const initialSections = [
  {
    name: "section1",
    text: "sleeping is important",
    description: "remember to sleep at least 8h every day"
  }, {
    name: "section2",
    text: "eating is important",
    description: "remember to eat at least 5 times epr day"
  }, {
    name: "section3",
    text: "doing excercice is important",
    description: "remember to to excercise"
  }
];

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

describe('sections CRUD', () => {
  describe('GET /sections' , () =>{
    test('should return all sections', async () => {
      const response = await api 
        .get('/sections')
        .expect(200)
        .expect('Content-Type', /application\/json/);

        expect(response.body).toHaveLength(initialSections.length);
    })
  })
})
