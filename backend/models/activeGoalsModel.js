const mongoose = require("mongoose");

const activeGoalsSchema = new mongoose.Schema({
  username: String,
  title: String,
  price: String,
  startDate: String,
  saved: mongoose.Schema.Types.Decimal128,
});

// to write one to update amount saved per goal

module.exports = mongoose.model("activeGoals", activeGoalsSchema);
