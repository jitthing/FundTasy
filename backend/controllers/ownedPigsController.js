const ownedPigs = require("../models/ownedPigsModel");
const Users = require("../models/userModel");
const CoinTransactions = require("../models/coinTransactionModel");
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

const buyPig = async (req, res) => {
  try {
    {
      /* STEPS:
      1. send request to buy pig (only contain token and pigName 
      2. get User and pig price
      3. check if able to buy pig (if not return status 400)
      4. add to ownedPigs and subtract coin balance
      5. create new coin transaction */
    }
    const user = await Users.findOne({ username: req.body.username });
    const username = user.username;
    const { pigName, pigPrice } = req.body;
    const currentCoins = user.coinBalance;
    if (currentCoins < pigPrice) {
      return res.status(400).json({ message: "Not enough coins!" });
    } else {
      const newPig = await ownedPigs.create({ username, modelName: pigName });
      const userToUpdate = await Users.findOneAndUpdate(
        { username: user.username },
        { coinBalance: currentCoins - pigPrice },
        { new: true }
      );
      const deduction = await CoinTransactions.create({
        username: user.username,
        description: "Purchase " + pigName,
        type: "Purchase",
        amount: pigPrice,
      });
      if (newPig && userToUpdate && deduction) {
        return res.status(200).json({ message: `${pigName} bought!` });
      }
    }
  } catch (error) {
    console.log("Error: " + error);
    return res.status(400).json({ message: "Failed to buy pig: " + error });
  }
};

module.exports = { getAllOwnedPigs, buyPig };
