require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")("series");

const connectDataBase = require("./database");
const initializeServer = require("./server/initializeServer");
const app = require("./server/index");

const port = process.env.PORT || 4000;
const dbUrl = process.env.MONGO_CONNECT;

(async () => {
  try {
    await connectDataBase(dbUrl);
    await initializeServer(port, app);
    debug(chalk.greenBright.bgMagenta("Initialization succesful!"));
  } catch (error) {
    debug(chalk.redBright(`Error: ${error.message}`));
  }
})();
