const mongoose = require("mongoose");

const activeGoalsSchema = new mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  startDate: { type: String, required: true },
  saved: { type: Number, required: true },
  status: { type: String, default: "In Progress" },
});

// to write one to update amount saved per goal

module.exports = mongoose.model("activeGoals", activeGoalsSchema);
