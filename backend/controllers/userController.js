require("dotenv").config();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const Users = require("../models/userModel");

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
const EMAIL = process.env.REACT_APP_EMAIL;
const PASSWORD = process.env.REACT_APP_PASSWORD;
const jwt = require('jsonwebtoken');
const SecretKey = messages = [
  { "role": "system", "content": "You are a helpful assistant." },
  { "role": "user", "content": "Hello!" }
]
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(CLIENT_ID);

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const authenticateUser = async (req, res) => {
  if(!validateEmail(req.body.username)){
    return res.status(400).json({ message: "Invalid email address" });
  }
  const user = await Users.findOne({ username: req.body.username });

  if (user === null) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Password incorrect" });
  }
  const authToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1hr' }); // bind token to user id
  return res.status(200).json({ message: "Successful login", authToken, });
};

const userInfo = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Found user", user });

  } catch (error) {
    console.error("Error getting user info:", error);
    return res.status(500).json({ message: "Internal Server Error" });

  }
}

const create_account = async (req, res) => {
  if(!validateEmail(req.body.username)){
    return res.status(400).json({ message: "Invalid email address" });
  }
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
  const authToken = jwt.sign({ id: createdUser._id }, JWT_SECRET, { expiresIn: '1hr' });
  return res.status(200).json({ message: "Account created succesfully", authToken, });
};

const updatePassword = async (req, res) => {

  const { userId, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  const updatedUser = await Users.findOneAndUpdate(
    { _id: userId },
    { $set: { password: hashedPassword } },
    { new: true }
  );
  if (updatedUser) {
    return res.status(200).json({ message: "Password updated" });
  } else {
    return res.status(500).json({ message: "Unable to update password something went wrong" });
  }
};

const forgotPassword = async (req, res) => {
  const { username } = req.body;
  if(!validateEmail(username)){
    return res.status(400).json({ message: "Invalid email address" });
  }
  try {
    const user = await Users.findOne({ username: username });
    if (user === null) {
      return res.status(404).json({ message: "User does not exist/not found" });
    } else {
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1hr' });
      var nodemailer = require('nodemailer');

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL,
          pass: PASSWORD
        }
      });

      var mailOptions = {
        from: 'smufundtasy@gmail.com',
        to: username,
        subject: 'FundTasy password reset',
        text: `Click on the link to reset your password: http://localhost:3000/resetpassword/${user._id}/${token} This link will expire in 1 hour.`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: `Encountered error sending email to ${username}` });
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).json({ message: `Email has been sent to ${username}` });
        }
      })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
}

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
    console.log("Ticket:", ticket);

    let user = await Users.findOne({ username: email });
    if (!user) {
      user = new Users({ username: email, password: userid });
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

const getAllModels = async (res) => {
  const Models = await Models.find({}).toArray();
  if (Models === null) {
    return res.status(400).json({ message: "No Models Found" });
  }
  return res.status(200).json(Models);
};

const validateResetToken = async (req, res) => {
  const { userId, token } = req.params;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log("Decoded token:", decoded);
    if (decoded.id === userId) {
      user = await Users.findById(userId).select("-password");
      return res.status(200).json({ message: "Token is valid", decoded_jwt: decoded, user });
    }
  }
  catch (error) {
    return res.status(500).json({ message: "Token has expired / Invalid token" });
  }

}

module.exports = {
  authenticateUser,
  create_account,
  updatePassword,
  google_login,
  getAllModels,
  forgotPassword,
  userInfo,
  validateResetToken,
};
