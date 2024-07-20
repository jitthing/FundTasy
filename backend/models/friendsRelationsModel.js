const mongoose = require("mongoose");

const friendsRelationsSchema = new mongoose.Schema({
    user1: { type: String, required: true },
    user2: { type: String, required: true },
    pending: { type: Boolean, required: true },
    date_requested: { type: Date, required: true, default: Date.now },
    date_accepted: { type: Date, required: false },

});


module.exports = mongoose.model("FriendsRelations", friendsRelationsSchema);