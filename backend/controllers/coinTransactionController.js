const CoinTransactions = require("../models/coinTransactionModel.js");
const ActiveGoals = require("../models/activeGoalsModel.js");
const { getUserFromToken } = require("./userController.js");

const newCoinTransaction = async (req, res) => {
    const { user } = await getUserFromToken(req);
    const { coinData } = req.body;
    const userGoal = await ActiveGoals.findById(coinData.goalId);
    try {
        const createCoinTransaction = await CoinTransactions.create({
            username: user.username,
            goal: userGoal._id,
            description: userGoal.title,
            type: coinData.type,
            amount: coinData.amount
        })
        return res.status(200).json({ message: "Coin transaction created!", cointransaction: createCoinTransaction });
    } catch (error) {
        console.error("Unable to create new coin transaction: " + error);
    }
}

const getCoinTransactions = async (req, res) => {
    try {
        const { user, error } = await getUserFromToken(req);
        if (error) {
            return res.status(500).json({ message: error });
        }
        const username = user.username;
        const coinTransactions = await CoinTransactions.find({ username: username });
        if (coinTransactions) {
            return res.status(200).json({ message: "all coin transactions ", coinTransactions });
        } else {
            return res.status(200).json({ message: "empty" });
        }
    } catch (error) {
        console.error("Unable to retrieve coin transactions: " + error);
    }
}

module.exports = { newCoinTransaction, getCoinTransactions };