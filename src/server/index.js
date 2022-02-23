const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const usersRouter = require("./routers/usersRouter");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.use("/users", usersRouter);

module.exports = app;
