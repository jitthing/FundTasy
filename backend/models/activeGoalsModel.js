const mongoose = require("mongoose");

const activeGoalsSchema = new mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  startDate: { type: String, required: true },
  saved: { type: Number, required: true },
  status: { type: String, default: "In Progress" },
  lastUpdatedAmount: { type: Number, required: true, default: -1 },
  lastUpdatedDate: { type: Date, default: Date.now }
});

// to write one to update amount saved per goal

module.exports = mongoose.model("activeGoals", activeGoalsSchema);
