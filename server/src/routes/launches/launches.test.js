const request = require("supertest");

const app = require("../../app");

describe("Test GET/launches", () => {
  test("It should response with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST/launches", () => {
  const completeLaunchData = {
    missiong: "USS enterprise",
    rocket: "CNN 112",
    target: "Exoplanet 01",
    launchDate: new Date("January 2, 2028"),
  };

  test("It should response with status 201 created", async () => {
    const dataWithoutDate = {
      missiong: "USS enterprise",
      rocket: "CNN 112",
      target: "Exoplanet 01",
    };

    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(requestDate).toBe(responseDate);

    expect(response.body).toMatchObject(dataWithoutDate);
  });

  test("It should catch missing required properties", () => {});
  test("It should catch the invalid dates", () => {});
});
