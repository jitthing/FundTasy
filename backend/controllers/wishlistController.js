const Wishlist = require("../models/wishlistModel.js");

const getAllItems = async (req, res) => {
  const cursor = await Wishlist.find({});
  //   const dbModels = await cursor.toArray();
  if (cursor === null) {
    return res.status(400).json({ message: "No items Found" });
  }
  let result = [];
  for (item of cursor) {
    result.push(item);
  }
  return res.status(200).json(result);
};
const addItem = async (req, res) => {
  const itemName = req.body.title;

  const response = await Wishlist.findOne({ name: itemName });

  if (response !== null) {
    return res.status(400).json({ message: "Item already in wishlist!" });
  }
  const createdItem = await Wishlist.create({
    name: itemName,
    price: req.body.price,
    image: req.body.image,
    active: false,
    completed: false,
  });

  if (createdItem) {
    return res
      .status(200)
      .json({ message: "Item successfully added to wishlist" });
  }
};

module.exports = { getAllItems, addItem };
