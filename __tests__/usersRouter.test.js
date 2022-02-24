require("dotenv").config();
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const connectDataBase = require("../src/database");
const User = require("../src/database/models/User");
const { app } = require("..");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await connectDataBase(connectionString);
});

beforeEach(async () => {
  await User.create({
    name: "Lila",
    username: "superLila",
    password: "$2b$10$pwxjOnj5C03DCc1qIPQoQOO952.1XDULGOWGVfRTdEJ9Mu4ReLFjK",
    admin: true,
  });
  await User.create({
    name: "Sam",
    username: "superSam",
    password: "l$2b$10$0RZnrivM9Ruzkguthufok.ynDLnEWQ3FsBdY4Db5pTYXnG5SlJXie",
    admin: false,
  });
  await User.create({
    name: "Tom",
    username: "superTom",
    password: "$2b$10$aB8gaaXny2b4n8vfEtm1bOImgzG8m0j4qMnTh4wy5Eqdr/fSWOOd6",
    admin: false,
  });
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a /users/login/ endpoint", () => {
  describe("When it receives a GET request with valid username and password", () => {
    test.only("Then it should respond with 200 status code and token", async () => {
      const user = {
        name: "Lila",
        username: "superLila",
        password: "rosa",
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
