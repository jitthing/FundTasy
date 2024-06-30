const transaction = require("../models/transactionModel");
const { getUserFromToken } = require("./userController");
const newTransaction = async (req, res) => {
    // console.log(req.body);
    const { formData, username } = req.body;
    try {
        const createTransaction = await transaction.create({
            title: formData.title,
            category: formData.category,
            goal: formData.goal,
            amount: formData.amount,
            username: username,
        });
        return res.status(200).json({ message: "Transaction created!", transaction: createTransaction });
    } catch (error) {
        console.error("Failed to create transaction:", error);
        return res.status(500).json({ message: "Failed to create transaction" });
    }
};


const allTransactions = async (req, res) => {
    try{
        const { user, error } = await getUserFromToken(req);
        if (error) {
            return res.status(500).json({ message: error });
        }
        const username = user.username;
        const transactions = await transaction.find({ username: username });
        return res.status(200).json({ message: "all transactions ", transactions });
    } catch (error) {
        console.error(" hahaha Error getting transactions:", error);
        // console.log("Error getting transactions:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}

module.exports = { newTransaction, allTransactions };