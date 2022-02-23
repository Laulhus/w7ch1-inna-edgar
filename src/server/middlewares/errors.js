const chalk = require("chalk");

const notFoundError = (req, res) => {
  res.status(404);
  res.json({ error: true, message: "Resource not found" });
};

const generalError = (err, req, res, next) => {
  debug(chalk.red(`Error: ${err.message}`));
};
