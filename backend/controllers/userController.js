const Users = require("../models/userModel");

const getUser = async (req, res) => {
  const user = await Users.findOne({ username: req.body.username });

  if (user === null) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = req.body.password === user.password;
  if (!isMatch) {
    return res.status(400).json({ message: "Password incorrect" });
  }

  return res.status(200).json({ message: "Successful login" });
};

const create_account = async (req, res) => {
  const newUser = req.body;

  const foundUser = await Users.findOne({ username: newUser.username });

  if (foundUser !== null) {
    return res.status(400).json({ message: "Username already exists" });
  }

  if (newUser.password.length < 4) {
    return res.status(400).json({ message: "Password is too short" });
  }

  const createdUser = await Users.create(newUser);

  return res.status(200).json(createdUser);
};

module.exports = { getUser, create_account };
