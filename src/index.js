const chalk = require("chalk");
const connectDataBase = require("./database");
const debug = require("debug")("series");
const initializeServer = require("./server/initializeServer");
const express = require("express");

const port = process.env.PORT || 4000;
const dbUrl = process.env.MONGO_CONNECT;
const app = express()(async () => {
  try {
    await connectDataBase(dbUrl);
    await initializeServer(port, app);
    debug(chalk.greenBright.bgMagenta("Initialization succesful!"));
  } catch (error) {
    debug(chalk.redBright(`Error: ${error.message}`));
  }
})();
