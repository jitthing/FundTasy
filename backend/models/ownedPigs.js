const mongoose = require("mongoose");

const ownedPigsSchema = new mongoose.Schema({
  username: { type: String, required: true },
  modelName: { type: String, required: true },
});

module.exports = mongoose.model("OwnedPigs", ownedPigsSchema);
