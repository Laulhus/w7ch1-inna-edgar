const debug = require("debug")("series:server");

const initializeServer = (port, app) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.greenBright(`Server listening on http://localhost:${port}`));
    });
  });
