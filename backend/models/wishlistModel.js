const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  username: String,
  name: String,
  price: String,
  image: String,
});

module.exports = mongoose.model("WishlistItems", wishlistSchema);
