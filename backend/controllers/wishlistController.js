const Wishlist = require("../models/wishlistModel.js");
const { getUserFromToken } = require("./userController");
const getAllItems = async (req, res) => {
  const { formData, username } = req.body;
  try {
    const { user, error } = await getUserFromToken(req);
    if (error) {
      return res.status(500).json({ message: error });
    }
    const username = user.username;
    const items = await Wishlist.find({ username: username });
    return res.status(200).json({ items });
  } catch (error) {
    console.error("Error getting wishlist items:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const addItem = async (req, res) => {
  const itemName = req.body.title;
  const username = req.body.username;
  const response = await Wishlist.findOne({
    name: itemName,
    username: username,
  });

  if (response !== null) {
    return res.status(400).json({ message: "Item already in wishlist!" });
  }
  const createdItem = await Wishlist.create({
    username: username,
    name: itemName,
    price: req.body.price,
    image: req.body.image,
  });

  if (createdItem) {
    return res
      .status(200)
      .json({ message: "Item successfully added to wishlist" });
  }
};

const deleteItem = async (req, res) => {
  const response = await Wishlist.findByIdAndDelete(req.params.id);

  if (response) {
    return res.status(200).json({ message: "Item successfully deleted" });
  } else {
    return res
      .status(400)
      .json({ message: "Failed to delete item", id: req.body.id });
  }
};

const getInProgressItems = async (req, res) => {
  const { formData, username } = req.body;
  try {
    const { user, error } = await getUserFromToken(req);
    if (error) {
      return res.status(500).json({ message: error });
    }
    const username = user.username;
    const items = await Wishlist.find({ username: username, status: "In Progress" });
    return res.status(200).json({ items });
  } catch (error) {
    console.error("Error getting wishlist items:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getAllItems, addItem, deleteItem, getInProgressItems };
