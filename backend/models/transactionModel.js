const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  title: {type: String, required: true },
  category: { type: String, required: true },
  // goal: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);