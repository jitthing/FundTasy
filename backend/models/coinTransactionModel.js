const mongoose = require("mongoose");
const { Schema } = mongoose;

const coinTransactionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  goal: { type: Schema.Types.ObjectId, ref: "activeGoals", default: null },
  description: {type: String, required: true },
  type: { type: String, required: true, enum:['Purchase', 'Reward'] },
  amount: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("CoinTransactions", coinTransactionSchema);