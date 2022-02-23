const express = require("express");
const {
  createPlatform,
  getPlatforms,
} = require("../controllers/platformControllers");

const platformRouter = express.Router();

platformRouter.get("/", getPlatforms);
platformRouter.post("/", createPlatform);

module.exports = platformRouter;
