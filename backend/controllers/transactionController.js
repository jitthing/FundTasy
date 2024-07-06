const transaction = require("../models/transactionModel");
const { getUserFromToken } = require("./userController");
const newTransaction = async (req, res) => {
    // console.log(req.body);
    const { formData, username } = req.body;
    try {
        const createTransaction = await transaction.create({
            title: formData.title,
            category: formData.category,
            // goal: formData.goal,
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

const deleteTransaction = async (req, res) => {
    const response = await transaction.findByIdAndDelete(req.params.id);
  
    if (response) {
      return res.status(200).json({ message: "Transaction successfully deleted" });
    } else {
      return res
        .status(400)
        .json({ message: "Failed to delete transaction", id: req.body.id });
    }
  };

  const editTransaction = async (req, res) => {
    const { id } = req.params;
    const { formData } = req.body;
    try {
        const updatedTransaction = await transaction.findByIdAndUpdate(
            id,
            {
                title: formData.title,
                category: formData.category,
                amount: formData.amount,
            },
            { new: true }
        );
        if (updatedTransaction) {
            return res.status(200).json({ message: "Transaction updated!", transaction: updatedTransaction });
        } else {
            return res.status(404).json({ message: "Transaction not found" });
        }
    } catch (error) {
        console.error("Failed to update transaction:", error);
        return res.status(500).json({ message: "Failed to update transaction" });
    }
};

module.exports = { newTransaction, allTransactions, deleteTransaction, editTransaction };