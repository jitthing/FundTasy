const bcrypt = require("bcryptjs");

const Users = require("../models/userModel");

const authenticateUser = async (req, res) => {
  const user = await Users.findOne({ username: req.body.username });

  if (user === null) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Password incorrect" });
  }

  return res.status(200).json({ message: "Successful login" });
};

const create_account = async (req, res) => {
  const newUser = req.body; // { username: ... , password: ... }

  const foundUser = await Users.findOne({ username: newUser.username });

  if (foundUser !== null) {
    return res.status(400).json({ message: "Username already exists" });
  }

  if (newUser.password.length < 4) {
    return res.status(400).json({ message: "Password is too short" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newUser.password, salt);

  const createdUser = await Users.create({
    username: newUser.username,
    password: hashedPassword,
  });

  return res.status(200).json(createdUser);
};

const resetPassword = async (req, res) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const updatedUser = await Users.findOneAndUpdate(
    { username: username },
    { $set: { password: hashedPassword } },
    { new: true }
  );
  if (updatedUser) {
    return res.status(200).json({ message: "Password updated succcessfully" });
  } else {
    return res.status(400).json({ message: "User not found" });
  }
};

module.exports = { authenticateUser, create_account, resetPassword };
