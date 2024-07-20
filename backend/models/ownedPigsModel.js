const mongoose = require("mongoose");

const ownedPigsSchema = new mongoose.Schema({
  username: { type: String, required: true },
  modelName: { type: String, required: true },
  dateEarned: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model("OwnedPigs", ownedPigsSchema);
