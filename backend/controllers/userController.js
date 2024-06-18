require("dotenv").config();
const bcrypt = require("bcryptjs");
const Users = require("../models/userModel");

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
const jwt = require("jsonwebtoken");
const SecretKey = (messages = [
  { role: "system", content: "You are a helpful assistant." },
  { role: "user", content: "Hello!" },
]);
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(CLIENT_ID);

const authenticateUser = async (req, res) => {
  const user = await Users.findOne({ username: req.body.username });

  if (user === null) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Password incorrect" });
  }
  const authToken = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: "1hr",
  }); // bind token to user id
  return res.status(200).json({ message: "Successful login", authToken });
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
  const authToken = jwt.sign({ id: createdUser._id }, JWT_SECRET, {
    expiresIn: "1hr",
  });
  return res
    .status(200)
    .json({ message: "Account created succesfully", authToken });
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

const google_login = async (req, res) => {
  try {
    const { token } = req.body;
    console.log("Received token");
    // console.log(req.body);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    const email = payload["email"];
    console.log("Ticket:", ticket);

    let user = await Users.findOne({ username: email });
    if (!user) {
      user = new Users({ username: email, password: userid });
      await user.save();
    }
    const authToken = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1hr",
    });
    return res.status(200).json({ message: "Successful login", authToken });
  } catch (error) {
    console.error("Error receiving token:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  authenticateUser,
  create_account,
  resetPassword,
  google_login,
};
