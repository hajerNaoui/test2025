
const request = require('supertest')
const app = require('../server')

const baseURL = "http://localhost:3002"

describe("POST /event", () => {
  const newEvent = {
    title: 'test is cool',
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "2024-06-01",
    category: "category1",
  }
  it("should add an item to events array", async () => {
    const response = await request(baseURL).post("/api/events").send(newEvent);
    expect(response.statusCode).toEqual(200)
  });
});