const Platform = require("../../database/models/Platform");

const getPlatforms = async (req, res) => {
  const platforms = await Platform.find();
  res.json(platforms);
};

const createPlatform = async (req, res, next) => {
  try {
    const createdPlatform = await Platform.create(req.body);
    if (createdPlatform) {
      res.json(createdPlatform);
    } else {
      const error = new Error("Invalid data format");
      error.code = 400;
      next(error);
    }
  } catch (error) {
    error.code = 500;
    error.message = "Couldn't create document";
    next(error);
  }
};

const updatePlatform = async (req, res, next) => {
  try {
    const { id } = req.params;
    const platform = req.body;
    const updatedPlatform = await Platform.findByIdAndUpdate(id, platform);
    if (!updatedPlatform) {
      const error = new Error("Invalid data format");
      error.code = 400;
      next(error);
    } else {
      res.json(updatedPlatform);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getPlatforms, createPlatform, updatePlatform };
