const { model, Schema } = require("mongoose");

const platformSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  series: {
    type: Array,
  },
});

const Platform = model("Platform", platformSchema, "platforms");
module.exports = Platform;
