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

      User.findById = jest.fn().mockResolvedValue(null);

      await userLogin(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
