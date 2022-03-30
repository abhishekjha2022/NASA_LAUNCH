const request = require("supertest");
const app = require("../app");
const { mongoConnect, mongoDisconnect } = require("../services/mongo");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("To test the GET/ Launches", () => {
    test("Expect response to be 200 success", async () => {
      const response = await request(app)
        .get("/launches")
        .expect(200)
        .expect("Content-Type", /json/);
    });
  });

  describe("To test the POST/ Launches", () => {
    const completeLaunchData = {
      mission: "Colonize mars",
      rocket: "Kepler-ISO",
      target: "Kepler-1",
      launchDate: "January 14,2023",
    };
    const completeLaunchDataWithoutDate = {
      mission: "Colonize mars",
      rocket: "Kepler-ISO",
      target: "Kepler-62 f",
    };
    const invalidDate = {
      mission: "Colonize mars",
      rocket: "Kepler-ISO",
      target: "Kepler-62 f",
      launchDate: "Hello",
    };
    test("Expect the response of 201 created", async () => {
      const response = await request(app)
        .post("/launches")
        .send(completeLaunchData)
        .expect(201)
        .expect("Content-Type", /json/);

      const requestLaunchDate = new Date(
        completeLaunchData.launchDate
      ).valueOf();
      const responseLaunchDate = new Date(response.body.launchDate).valueOf();
      expect(requestLaunchDate).toBe(responseLaunchDate);
      expect(response.body).toMatchObject(completeLaunchDataWithoutDate);
    });
    test("It should catch the missing required Properties", async () => {
      const response = await request(app)
        .post("/launches")
        .send(completeLaunchDataWithoutDate)
        .expect(400);
      expect(response.body).toStrictEqual({
        error: "Not sufficient information",
      });
    });
    test("It should catch the  invalid launch date", async () => {
      const response = await request(app)
        .post("/launches")
        .send(invalidDate)
        .expect(400);
      expect(response.body).toStrictEqual({
        error: "Date is incorrect",
      });
    });
  });
});
