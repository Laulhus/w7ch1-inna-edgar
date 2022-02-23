const Platform = require("../src/database/models/Platform");
const {
  deletePlatform,
} = require("../src/server/controllers/platformControllers");

describe("Given a deletePlatform controller", () => {
  describe("When it receives a request with params: id and a response", () => {
    test("Then it should call the response json method with a deleted platform", async () => {
      const res = {
        json: jest.fn(),
      };
      const req = {
        params: { id: 1 },
      };
      const deletedPlatform = {
        name: "Netflix",
      };
      Platform.findByIdAndDelete = jest.fn().mockResolvedValue(deletedPlatform);

      await deletePlatform(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When it receives a request with params: 'a wrong id' and a response", () => {
    test("Then it should call the response next method with a 404 error", async () => {
      const next = jest.fn();
      const req = {
        params: { id: 1 },
      };

      Platform.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      await deletePlatform(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives a request and a response and it fails to access the database", () => {
    test("Then it should call the response next method with a 400 error", async () => {
      const next = jest.fn();
      const req = {
        params: { id: 1 },
      };
      const error = { code: 500 };
      Platform.findByIdAndDelete = jest.fn().mockRejectedValue(error);

      await deletePlatform(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
