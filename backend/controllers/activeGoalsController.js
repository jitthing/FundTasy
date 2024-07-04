const ActiveGoals = require("../models/activeGoalsModel.js");
const Users = require("../models/userModel.js");
const { getUserFromToken } = require("./userController.js");
const getActiveItems = async (req, res) => {
  try {
    const { user, error } = await getUserFromToken(req);
    if (error) {
      return res.status(400).json({ message: error });
    }
    const username = user.username;
    const userGoals = await ActiveGoals.find({ username });
    return res.status(200).json({ message: "testing123", userGoals });
  } catch (error) {
    console.log("Error: " + error);
    return res.status(400).json({ message: "Failed to fetch goals: " + error });
  }
};

const addActiveItem = async (req, res) => {
  const countGoals = await ActiveGoals.countDocuments({
    username: req.body.username,
  });
  if (countGoals >= 3) {
    return res
      .status(400)
      .json({ message: "You can only have 3 goals at a time" });
  }

  const response = await ActiveGoals.findOne({ title: req.body.title });

  if (response !== null) {
    return res.status(400).json({ message: "Goal already exists" });
  }

  const createdGoal = await ActiveGoals.create({
    username: req.body.username,
    title: req.body.title,
    price: req.body.price,
    startDate: new Date().toISOString().slice(0, 10),
    saved: 0,
  });

  return res.status(200).json({ message: "Goal added succesfully!" });
};

const deleteActiveItem = async (req, res) => {
  // when delete activeGoal, need to update bank balance
  // get the activeGoal saved value and update bank balance then delete
  const amount = parseFloat(req.params.amount);
  const { user } = await getUserFromToken(req);
  const userObj = await Users.findOne({ username: user.username });
  const newBalance = userObj.bankBalance + amount;
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
  const goalObj = await ActiveGoals.findById(req.body.id);
  const newSaved = goalObj.saved + amount;
  const updated = await ActiveGoals.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { saved: newSaved } },
    { new: true }
  );
  if (updated) {
    return res.status(200).json({ message: "Bank balance updated" });
  } else {
    return res.status(500).json({ message: "Unable to update bank balance" });
  }
};

module.exports = {
  getActiveItems,
  addActiveItem,
  deleteActiveItem,
  updateSavedValue,
};
