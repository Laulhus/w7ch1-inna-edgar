const { model, Schema } = require("mongoose");

const serieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  platform: {
    type: Schema.Types.ObjectId,
    ref: "Platform",
  },
});

const Serie = model("Serie", serieSchema, "series");
module.exports = Serie;
