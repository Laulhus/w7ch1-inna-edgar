const express = require("express");
const {
  createPlatform,
  getPlatforms,
  updatePlatform,
} = require("../controllers/platformControllers");

const platformRouter = express.Router();

platformRouter.get("/", getPlatforms);
platformRouter.post("/", createPlatform);
platformRouter.put("/:idPlatform", updatePlatform);
platformRouter.delete("/:idPlatform", deletePlatform);

module.exports = platformRouter;
