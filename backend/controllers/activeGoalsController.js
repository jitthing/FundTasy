const ActiveGoals = require("../models/activeGoalsModel.js");

const getActiveItems = async (req, res) => {
  const username = req.body.username;

  const cursor = await ActiveGoals.find({ username: username });

  if (cursor === null) {
    res.status(404).json([]);
  }

  let result = [];
  for (item of cursor) {
    result.push(item);
  }
  return res.status(200).json(result);
};

const addActiveItem = async (req, res) => {
  const { name, price } = req.body;

  const response = await ActiveGoals.find({ name: name });

  if (response !== null) {
    res.status(400).json({ message: "Goal already exists" });
  }

  const createdGoal = await ActiveGoals.create({
    username: req.body.username,
    title: req.body.title,
    price: req.body.price,
    saved: 0,
  });

  return res.status(200).json({ message: "Goal added succesfully!" });
};

module.exports = { getActiveItems, addActiveItem };
