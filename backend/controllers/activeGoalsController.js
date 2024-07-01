const ActiveGoals = require("../models/activeGoalsModel.js");
const { getUserFromToken } = require("./userController.js")
const getActiveItems = async (req, res) => {
  try {
    const { user, error } = await getUserFromToken(req);
    if(error) {
      return res.status(400).json({message: error});
    }
    const username = user.username;
    const userGoals = await ActiveGoals.find({ username });
    return res.status(200).json({ message:"testing123" ,userGoals });
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

module.exports = { getActiveItems, addActiveItem };
