describe("Given a createPlatform controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call the response json method with an array of platforms", async () => {
      const res = {
        json: jest.fn(),
      };
      const platform =  {
          name: "Netflix",
        },
        
      Platform.find = jest.fn().mockResolvedValue(platforms);

      await getPlatforms(null, res);

      expect(res.json).toHaveBeenCalledWith(platforms);
    });
  });
});
