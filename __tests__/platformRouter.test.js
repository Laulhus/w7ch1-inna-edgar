require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const bcrypt = require("bcrypt");
const connectDataBase = require("../src/database");
const app = require("../src/server");
const User = require("../src/database/models/User");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();

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
  await mongoServer.stop();
});

describe("Given a /platforms endpoint", () => {
  describe("When it receives a GET request with valid username and password", () => {
    test("Then it should respond with 200 status code and an array of platforms", async () => {
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
});
