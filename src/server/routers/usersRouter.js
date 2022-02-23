const express = require("express");
const { userLogin } = require("../controllers/usersControllers");

const router = express.Router();

router.post("/login", userLogin);

module.exports = router;
