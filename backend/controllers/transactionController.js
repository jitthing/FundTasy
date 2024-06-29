const transaction = require("../models/transactionModel");

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
module.exports = { newTransaction };