require("dotenv").config();
const auth = require("../src/server/middlewares/auth");

describe("Given an auth middleware", () => {
  describe("When it gets a request, a response and a valid token", () => {
    test("Then it should call the response next method", async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3RtYW4iLCJpZCI6IjYyMTdiZmVkZTc1M2MwYjg3YjFmYzY4YiIsImlhdCI6MTY0NTcyMzg5NH0.dLFj4iJ0Kf5merQK6vofOn4tgY-88NsKp9ABICv5HhI";
      const req = {
        header: jest.fn().mockReturnValue(`Bearer ${token}`),
      };
      const next = jest.fn();

      await auth(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it gets a request, a response and an invalid token", () => {
    test("Then it should call the response next method with an error", async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3RtYW4iLCJpZCI6IjYyMTdiZmVkZTc1M2MwYjg3YjFmYzY4YiIsImlhdCI6MTY0NTcyMzg5NH0.dLFj4iJ0Kf5merQK6vofOn4tgY-88NsKp9ABICv5HhU";
      const req = {
        header: jest.fn().mockReturnValue(`Bearer ${token}`),
      };
      const next = jest.fn();
      const error = new Error("Invalid signature");

      await auth(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it gets a request and a response", () => {
    test("Then it should call the response next method with an error", async () => {
      const req = {
        header: jest.fn().mockReturnValue(``),
      };
      const next = jest.fn();
      const error = new Error("Token missing");

      await auth(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
