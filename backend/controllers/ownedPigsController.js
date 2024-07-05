const ownedPigs = require("../models/ownedPigsModel");
const { getUserFromToken } = require("./userController");

const getAllOwnedPigs = async (req, res) => {
  try {
    const { user, error } = await getUserFromToken(req);
    if (error) {
      return res.status(400).json({ message: error });
    }
    const username = user.username;
    const myPigs = await ownedPigs.find({ username });
    let want = [];
    for (item of myPigs) {
      want.push(item.modelName);
    }
    return res.status(200).json({ message: "testing123", want });
  } catch (error) {
    console.log("Error: " + error);
    return res.status(400).json({ message: "Failed to fetch goals: " + error });
  }
};

module.exports = { getAllOwnedPigs };
