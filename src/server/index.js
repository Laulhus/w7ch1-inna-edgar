const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { notFoundError, generalError } = require("./middlewares/errors");
const platformRouter = require("./routers/platformRouter");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.use("/platforms", platformRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
