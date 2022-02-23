const express = require("express");
const {
  createPlatform,
  getPlatforms,
  updatePlatform,
  deletePlatform,
} = require("../controllers/platformControllers");
const isAdmin = require("../middlewares/isAdmin");

const platformRouter = express.Router();

platformRouter.get("/", getPlatforms);
platformRouter.post("/", isAdmin, createPlatform);
platformRouter.put("/:idPlatform", isAdmin, updatePlatform);
platformRouter.delete("/:idPlatform", isAdmin, deletePlatform);

module.exports = platformRouter;
