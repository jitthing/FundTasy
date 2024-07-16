const ActiveGoals = require("../models/activeGoalsModel.js");
const Users = require("../models/userModel.js");
const CoinTransactions = require("../models/coinTransactionModel.js");
const { getUserFromToken, updateCoinBalance } = require("./userController.js");
const getActiveItems = async (req, res) => {
  try {
    const { user, error } = await getUserFromToken(req);
    if (error) {
      return res.status(400).json({ message: error });
    }
    const username = user.username;
    const userGoals = await ActiveGoals.find({
      username: username,
      status: "In Progress",
    });
    return res.status(200).json({ message: "testing123", userGoals });
  } catch (error) {
    console.log("Error: " + error);
    return res.status(400).json({ message: "Failed to fetch goals: " + error });
  }
};

const getAllGoals = async (req, res) => {
  try {
    const { user, error } = await getUserFromToken(req);
    if (error) {
      return res.status(400).json({ message: error });
    }
    const username = user.username;
    const userGoals = await ActiveGoals.find({
      username: username,
    });
    return res.status(200).json({ message: "Successfully retrieved all goals", userGoals });
  } catch (error) {
    console.log("Error: " + error);
    return res.status(400).json({ message: "Failed to fetch goals: " + error });
  }
};

const addActiveItem = async (req, res) => {
  if (!req.body.title || !req.body.price) {
    return res
      .status(400)
      .json({ message: "Please fill in all fields or select an option" });
  }

  const username = req.body.username;

  const response = await ActiveGoals.findOne({
    username: username,
    title: req.body.title,
    status: "In Progress"
  });

  if (response !== null) {
    return res.status(400).json({ message: "Goal already exists" });
  }

  const createdGoal = await ActiveGoals.create({
    username: req.body.username,
    title: req.body.title,
    price: req.body.price,
    startDate: new Date().toISOString().slice(0, 10),
    saved: 0,
    status: "In Progress"
  });

  return res.status(200).json({ message: "Goal added succesfully!" });
};

const deleteActiveItem = async (req, res) => {
  // when delete activeGoal, need to update bank balance
  // get the activeGoal saved value and update bank balance then delete
  const amount = parseFloat(req.params.amount);
  const { user } = await getUserFromToken(req);
  const userObj = await Users.findOne({ username: user.username });
  const newBalance = parseFloat(parseFloat(userObj.bankBalance + amount).toFixed(2));
  const updated = await Users.findOneAndUpdate(
    { username: userObj.username },
    { bankBalance: newBalance },
    { new: true }
  );
  if (updated) {
    const response = await ActiveGoals.findByIdAndDelete(req.params.id);

    if (response) {
      return res.status(200).json({ message: "Item successfully deleted" });
    } else {
      return res.status(400).json({ message: "Failed to delete item" });
    }
  } else {
    return res.status(400).json({ message: "Failed to update bank balance" });
  }
};

const updateSavedValue = async (req, res) => {
  const amount = req.body.amount;
  const goalObj = await ActiveGoals.findById(req.body.goalId);
  const newSaved = parseFloat(parseFloat(goalObj.saved).toFixed(2)) + parseFloat(parseFloat(amount).toFixed(2));
  const { user } = await getUserFromToken(req);
  const userObj = await Users.findOne({ username: user.username });
  const currentCoins = userObj.coinBalance;
  const updated = await ActiveGoals.findOneAndUpdate(
    { _id: req.body.goalId },
    { 
      saved: newSaved,
      lastUpdatedAmount: parseFloat(parseFloat(amount).toFixed(2)),
      lastUpdatedDate: Date.now()
    },
    { new: true }
  );
  if (updated) {
    if (parseFloat(updated.price).toFixed(2) === parseFloat(updated.saved).toFixed(2)) {
      const completed = await ActiveGoals.findOneAndUpdate(
        { _id: req.body.goalId },
        { status: "Completed" },
        { new: true }
      );
      const awarded = await CoinTransactions.create({
        username: user.username,
        goal: req.body.goalId,
        description: goalObj.title,
        type: "Reward",
        amount: updated.price * 100
      })
      const updatedCoins = await Users.findOneAndUpdate(
        { username: user.username },
        { coinBalance: currentCoins + (updated.price * 100) },
        { new: true }
      )
      if (completed && awarded && updatedCoins) {
        return res.status(200).json({ message: "Saved value updated and coins awarded", goalComplete: true, coinsAwarded: updated.price*100 });
      } else {
        return res
          .status(500)
          .json({ message: "Unable to update saved value", goalComplete: false });
      }
    } else {
      return res.status(200).json({ message: "updated saved value is ok", goalComplete: false })
    }
  } else {
    return res.status(404).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getActiveItems,
  addActiveItem,
  deleteActiveItem,
  updateSavedValue,
  getAllGoals
};
