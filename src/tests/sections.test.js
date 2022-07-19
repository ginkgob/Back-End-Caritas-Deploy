import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import server from  "../index";
import Section from "../models/Section";

const api = supertest(app);

const initialSections = [
  {
    title: "section1",
    text: ["p", "sleeping is important"],
  }, {
    title: "section2",
    text: ["p", "eating is important"],
  }, {
    title: "section3",
    text: ["p", "doing excercice is important"],
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
