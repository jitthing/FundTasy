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

module.exports = { getActiveItems };
