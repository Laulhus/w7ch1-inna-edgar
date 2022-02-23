const Platform = require("../../database/models/Platform");

const getPlatforms = async (req, res) => {
  const platforms = await Platform.find();
  res.json(platforms);
};

module.exports = getPlatforms;