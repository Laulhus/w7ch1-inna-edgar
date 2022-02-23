const jwt = require("jsonwebtoken");
const User = require("../src/database/models/User");
const { userLogin } = require("../src/server/controllers/usersControllers");

describe("Given a userLogin controller", () => {
  describe("When it receives a response with invalid username", () => {
    test("Then it should call next with error 'User not found'", async () => {
      const req = {
        body: {
          username: "Lila",
          password: "kdjfdjf",
        },
      };
      const next = jest.fn();
      const error = new Error("User not found");

      User.findOne = jest.fn().mockResolvedValue(null);

      await userLogin(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a response with invalid password", () => {
    test("Then it should call next with error 'Invalid password'", async () => {
      const req = {
        body: {
          username: "Lila",
          password: "lalala",
        },
      };
      const next = jest.fn();
      const error = new Error("Invalid password");
      const user = {
        username: "Lila",
        password:
          "$2b$10$7uqVZ5a5QmeinnPp098Us.09BLm2xUGbB7fC4P8I4lq7n5KWadpRO",
      };

      User.findOne = jest.fn().mockResolvedValue(user);

      await userLogin(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives request with valid username amd password", () => {
    test("Then it should call json method of the received response", async () => {
      const req = {
        body: {
          username: "Lila",
          password: "rosa",
        },
      };
      const user = {
        username: "Lila",
        password:
          "$2b$10$7uqVZ5a5QmeinnPp098Us.09BLm2xUGbB7fC4P8I4lq7n5KWadpRO",
      };
      const res = {
        json: jest.fn(),
      };

      const token = "flkjakjdf";
      User.findOne = jest.fn().mockResolvedValue(user);
      jwt.sign = jest.fn().mockResolvedValue(token);

      await userLogin(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });
});
