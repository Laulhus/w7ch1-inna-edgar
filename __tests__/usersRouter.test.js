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
    test("Then it should respond with 401 status code error message 'User not found'", async () => {
      const user = {
        name: "Testman",
        username: "Testman",
        password: "testpassa",
        admin: true,
      };
      const expectedErrorMessage = "User not found";

      const { body } = await request(app)
        .post("/users/login")
        .send(user)
        .expect(401);

      expect(body).toHaveProperty("error");
      expect(body.message).toBe(expectedErrorMessage);
    });
  });

  describe("When it receives a POST request with valid username and invalid password", () => {
    test("Then it should respond with 401 code and error message 'Invalid password'", async () => {
      const user = {
        name: "Testman",
        username: "testUser",
        password: "lsadfklkdf",
        admin: true,
      };
      const expectedErrorMessage = "Invalid password";

      const { body } = await request(app)
        .post("/users/login")
        .send(user)
        .expect(401);

      expect(body).toHaveProperty("error");
      expect(body.message).toBe(expectedErrorMessage);
    });
  });
});

describe("Given a /users/register/ endpoint", () => {
  describe("When it receives a POST request with a user", () => {
    test("Then it should respond with 200 and the user", async () => {
      const newUser = {
        name: "Tim",
        username: "supertim",
        password: "lalala",
        series: [],
      };

      const { body } = await request(app)
        .post("/users/register")
        .send(newUser)
        .expect(200);

      expect(body.username).toBe(newUser.username);
    });
  });
});
