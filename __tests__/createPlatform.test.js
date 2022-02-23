const Platform = require("../src/database/models/Platform");
const {
  createPlatform,
} = require("../src/server/controllers/platformControllers");

describe("Given a createPlatform controller", () => {
  describe("When it receives a request with body:platform and a response", () => {
    test("Then it should call the response json method with platform", async () => {
      const res = {
        json: jest.fn(),
      };
      const req = {
        body: { name: "Netflix" },
      };
      Platform.create = jest.fn().mockResolvedValue(req.body);

      await createPlatform(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When it receives a request, response and the database connection fails", () => {
    test("Then it should call the response next method with an error: 'Couldn't create document", async () => {
      const next = jest.fn();
      const req = {
        body: { name: "Netflix" },
      };
      const error = {
        code: 500,
        message: "Couldn't create document",
      };
      Platform.create = jest.fn().mockRejectedValue(error);

      await createPlatform(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a request with invalid data format and a response", () => {
    test("Then it should call the response next method with an error", async () => {
      const next = jest.fn();
      const req = {
        body: { name: "Netflix" },
      };
      Platform.create = jest.fn().mockResolvedValue(null);

      await createPlatform(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
