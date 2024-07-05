require("dotenv").config();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const Users = require("../models/userModel");

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
const EMAIL = process.env.REACT_APP_EMAIL;
const PASSWORD = process.env.REACT_APP_PASSWORD;
const jwt = require("jsonwebtoken");
const SecretKey = (messages = [
  { role: "system", content: "You are a helpful assistant." },
  { role: "user", content: "Hello!" },
]);
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(CLIENT_ID);

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

async function usernameExists(username) {
  return (user = await Users.findOne({ username: username }));
}

async function generateUniqueUsername(baseUsername) {
  let username = baseUsername;
  let counter = 1;

  while (await usernameExists(username)) {
    username = `${baseUsername}${counter}`;
    counter++;
  }

  return username;
}

const authenticateUser = async (req, res) => {
  console.log(req.body);
  if (!validateEmail(req.body.email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }
  const user = await Users.findOne({ email: req.body.email });

  if (user === null) {
    //User not found
    return res.status(404).json({ message: "Invalid email address/password" });
  }
  if (!user.password) {
    return res.status(400).json({
      message: "Please log in with the service you used to create your account",
    });
  } else {
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      // Invalid password
      return res
        .status(400)
        .json({ message: "Invalid email address/password" });
    }
  }
  const authToken = jwt.sign(
    { id: user._id, username: user.username },
    JWT_SECRET,
    { expiresIn: "1hr" }
  ); // Added username to the payload
  return res.status(200).json({ message: "Successful login", authToken });
};

// Shared function to get user from token
const getUserFromToken = async (req) => {
  try {
    // console.log("working");
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await Users.findById(decoded.id);
    if (!user) {
      return { error: "User not found" };
    }
    return { user }; // Return an object with the user
  } catch (error) {
    console.error("Error in getUserFromToken:", error);
    return { error: "Error verifying token or fetching user or token" }; // Return an object with the error
  }
};

const userInfo = async (req, res) => {
  try {
    const { user, error } = await getUserFromToken(req); // Destructure the response to get user or error
    if (error) {
      // Handle error if getUserFromToken returned an error
      return res.status(500).json({ message: error });
    }
    return res.status(200).json({ user, message: "User info retrieved" });
  } catch (error) {
    console.error("Error getting user info:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const { user, error } = await getUserFromToken(req);
    if (error) {
      return res.status(500).json({ message: error });
    }
    if (user) {
      const { firstName, lastName, email, income } = req.body;
      let fieldsToUpdate = { firstName, lastName, income };
      // check if normal user
      if (user.password) {
        if (validateEmail(email)) {
          fieldsToUpdate.email = email; //append email to fieldsToUpdate
        } else {
          return res.status(400).json({ message: "Invalid email address" });
        }
      }
      const updateUser = await Users.updateOne(
        { _id: user._id },
        { $set: fieldsToUpdate }
      );
      return res
        .status(200)
        .json({ message: "Updated user info successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.name + error.message });
  }
};

const create_account = async (req, res) => {
  if (!validateEmail(req.body.email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }
  if (!req.body.username || req.body.username.trim().length === 0) {
    return res.status(400).json({ message: "Username cannot be empty" });
  }
  const newUser = req.body; // { username: ... , password: ... }

  const foundUser = await Users.findOne({
    username: newUser.username.trim().toLowerCase(),
  });
  const foundEmail = await Users.findOne({
    email: newUser.email.trim().toLowerCase(),
  });

  if (foundEmail !== null) {
    return res.status(400).json({ message: "Email already exists" });
  }
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
    email: newUser.email,
    password: hashedPassword,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    displayPig: "basic",
  });
  const authToken = jwt.sign(
    { id: createdUser._id, usernamae: createdUser.username },
    JWT_SECRET,
    { expiresIn: "1hr" }
  );
  return res
    .status(200)
    .json({ message: "Account created succesfully", authToken });
};

const updatePassword = async (req, res) => {
  const { userId, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const updatedUser = await Users.findOneAndUpdate(
    { _id: userId },
    { $set: { password: hashedPassword } },
    { new: true }
  );
  if (updatedUser) {
    return res.status(200).json({ message: "Password updated" });
  } else {
    return res
      .status(500)
      .json({ message: "Unable to update password something went wrong" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }
  try {
    const user = await Users.findOne({ email: email.toLowerCase().trim() });
    if (user === null) {
      return res.status(404).json({ message: "User does not exist/not found" });
    } else if (!user.password) {
      return res.status(400).json({
        message:
          "Please log in with the service you used to create your account",
      });
    } else {
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: "1hr",
      });
      var nodemailer = require("nodemailer");

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: EMAIL,
          pass: PASSWORD,
        },
      });

      var mailOptions = {
        from: "smufundtasy@gmail.com",
        to: email,
        subject: "FundTasy password reset",
        text: `Click on the link to reset your password: http://localhost:3000/resetpassword/${user._id}/${token} This link will expire in 1 hour.`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res
            .status(500)
            .json({ message: `Encountered error sending email to ${email}` });
        } else {
          // console.log('Email sent: ' + info.response);
          return res
            .status(200)
            .json({ message: `Email has been sent to ${email}` });
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
};

const google_login = async (req, res) => {
  try {
    const { token } = req.body;
    // console.log("Received token");
    // console.log(req.body);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    const email = payload["email"];
    const firstName = payload["given_name"];
    const lastName = payload["family_name"];
    // console.log("Ticket:", ticket);

    let user = await Users.findOne({ email: email });
    if (!user) {
      let username = email.split("@")[0].toLowerCase();
      username = await generateUniqueUsername(username);
      user = new Users({
        email: email,
        username: username,
        firstName: firstName,
        lastName: lastName,
        displayPig: "basic",
      });
      await user.save();
    }
    const authToken = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "1hr",
      }
    );
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
      return res
        .status(200)
        .json({ message: "Token is valid", decoded_jwt: decoded, user });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Token has expired / Invalid token" });
  }
};

const updateDisplayPig = async (req, res) => {
  const { userId, current, updated } = req.body;
  try {
    if (current != updated) {
      const updatedDP = await Users.findOneAndUpdate(
        { username: userId },
        { $set: { displayPig: updated } },
        { new: true }
      );
      //console.log("changed db");
      //console.log(updatedDP);
      if (updatedDP) {
        return res.status(200).json({
          message: "Display pig updated successfully",
          displayPig: updatedDP.displayPig,
        });
      }
    } else {
      console.log("current == updated!");
    }
  } catch (error) {
    return res.status(500).json({ message: "Unable to update display pig" });
  }
};

const updateBankBalance = async (req, res) => {
  const amount = req.body.amount;
  const { user } = await getUserFromToken(req);
  const userObj = await Users.findOne({ username: user.username });
  const newBalance = userObj.bankBalance + amount;
  const updated = await Users.findOneAndUpdate(
    { username: userObj.username },
    { bankBalance: newBalance },
    { new: true }
  );
  if (updated) {
    return res.status(200).json({ message: "Bank balance updated" });
  } else {
    return res.status(500).json({ message: "Unable to update bank balance" });
  }
};

const updateCoinBalance = async (req, res) => {
  const amount = req.body.amount;
  const { user } = await getUserFromToken(req);
  const userObj = await Users.findOne({ username: user.username });
  const newBalance = userObj.coinBalance + amount;
  const updated = await Users.findOneAndUpdate(
    { username: userObj.username },
    { coinBalance: newBalance },
    { new: true }
  );
  if (updated) {
    return res.status(200).json({ message: "Coin balance updated" });
  } else {
    return res.status(400).json({ message: "Unable to update coin balance" });
  }
};

module.exports = {
  authenticateUser,
  create_account,
  updatePassword,
  google_login,
  getAllModels,
  forgotPassword,
  userInfo,
  validateResetToken,
  updateUserInfo,
  getUserFromToken,
  updateDisplayPig,
  updateCoinBalance,
  updateBankBalance,
};
