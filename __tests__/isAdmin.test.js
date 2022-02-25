const isAdmin = require("../src/server/middlewares/isAdmin");

describe("Given an isAdmin middleware", () => {
  describe("When it receives a request with property admin true and response", () => {
    test("Then it should call next", () => {
      const req = {
        body: { admin: true },
      };
      const next = jest.fn();
      isAdmin(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives a request with property admin false and response", () => {
    test("Then it should call next", () => {
      const req = {
        body: { admin: false },
      };
      const next = jest.fn();
      const error = new Error("Access not allowed");
      error.code = 403;
      isAdmin(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
