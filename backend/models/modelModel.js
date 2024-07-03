const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  modelName: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Models", modelSchema);
