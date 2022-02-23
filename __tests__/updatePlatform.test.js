const Platform = require("../src/database/models/Platform");
const {
  updatePlatform,
} = require("../src/server/controllers/platformControllers");

describe("Given an updatePlatform controller", () => {
  describe("When it receives a request with body:platform and a response", () => {
    test("Then it should call the response json method with platform", async () => {
      const res = {
        json: jest.fn(),
      };
      const req = {
        body: { name: "HBO" },
        params: { id: 1 },
      };
      const next = jest.fn();

      Platform.findByIdAndUpdate = jest.fn().mockResolvedValue(req.body);

      await updatePlatform(req, res, next);

      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When it receives a request with an invalid platform and a response", () => {
    test("Then it should call the response next method with the error 'Invalid data format'", async () => {
      const req = {
        body: { name: "HBO" },
        params: { id: 1 },
      };
      const next = jest.fn();

      Platform.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      await updatePlatform(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives a request and the update fails", () => {
    test("Then it should call the response next method with an error", async () => {
      const req = {
        body: { name: "HBO" },
        params: { id: 1 },
      };
      const next = jest.fn();

      Platform.findByIdAndUpdate = jest.fn().mockRejectedValue(req.body);

      await updatePlatform(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
