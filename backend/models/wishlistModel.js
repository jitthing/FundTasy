const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  username: String,
  name: String,
  price: { type: Number },
  image: String,
});

module.exports = mongoose.model("WishlistItems", wishlistSchema);
