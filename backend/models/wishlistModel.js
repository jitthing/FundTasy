const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  username: String,
  name: String,
  price: { type: Number },
  image: String,
  dateCreated: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model("WishlistItems", wishlistSchema);
