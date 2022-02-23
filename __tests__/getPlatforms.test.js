const Platform = require("../src/database/models/Platform");
const getPlatforms = require("../src/server/controllers/getPlatforms");

describe("Given a getPlatforms controller", () => {
  describe("When in receives a response", () => {
    test("Then it should call the response json method with an array of platforms", async () => {
      const res = {
        json: jest.fn(),
      };
      const platforms = [
        {
          name: "Netflix",
        },
        {
          name: "HBO",
        },
        {
          name: "DisneyPlus",
        },
      ];
      Platform.find = jest.fn().mockResolvedValue(platforms);

      await getPlatforms(null, res);

      expect(res.json).toHaveBeenCalledWith(platforms);
    });
  });
});
