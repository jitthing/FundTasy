const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  username: String,
  name: String,
  price: String,
  image: String,
  active: Boolean,
  completed: Boolean,
});

module.exports = mongoose.model("WishlistItems", wishlistSchema);
