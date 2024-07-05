const ownedPigs = require("../models/ownedPigsModel");
const { getUserFromToken } = require("./userController");

const getAllOwnedPigs = async (req, res) => {
  const { user } = await getUserFromToken(req);
  const myPigs = await ownedPigs.find({ username: user.username });
  if (myPigs) {
    return res.status(200).json({ message: "working", myPigs });
  }
  return res.status(400).json({ message: "unable to fetch owned pigs" });
};

module.exports = { getAllOwnedPigs };
