require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const bcrypt = require("bcrypt");
const connectDataBase = require("../src/database");
const User = require("../src/database/models/User");
const app = require("../src/server");

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const connectionString = mongo.getUri();

  await connectDataBase(connectionString);
});

beforeEach(async () => {
  const cryptPassword = await bcrypt.hash("testpass", 10);
  await User.create({
    name: "Testman",
    username: "testUser",
    password: cryptPassword,
  });
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

describe("Given a /users/login/ endpoint", () => {
  describe("When it receives a POST request with valid username and password", () => {
    test("Then it should respond with 200 status code and token", async () => {
      const user = {
        name: "Testman",
        username: "testUser",
        password: "testpass",
        admin: true,
      };

      const { body } = await request(app)
        .post("/users/login")
        .send(user)
        .expect(200);

      expect(body).toHaveProperty("token");
    });
  });

  describe("When it receives a POST request with invalid username and password", () => {
    test("Then it should respond with 401 status code", async () => {
      const user = {
        name: "Testman",
        username: "testUser",
        password: "testpassa",
        admin: true,
      };

      const { body } = await request(app)
        .post("/users/login")
        .send(user)
        .expect(401);
    });
  });
});
