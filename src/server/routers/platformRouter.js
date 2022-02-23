const express = require("express");
const getPlatforms = require("../controllers/getPlatforms");

const platformRouter = express.Router();

platformRouter.get("/", getPlatforms);

module.exports = platformRouter;
