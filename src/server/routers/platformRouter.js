const express = require("express");

const platformRouter = express.Router();

platformRouter.get("/", getPlatforms);

module.exports = platformRouter;
