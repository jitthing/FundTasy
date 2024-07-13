const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: String,
  firstName: String,
  lastName: String,
  coinBalance: { type: Number, default: 0 },
  income: { type: Number, default: 0 },
  displayPig: { type: String, default: "basic" },
  bankBalance : {type: Number, default: 0},
  isFirstTime : { type: Boolean, required: true, default: true },
  dateCreated: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model("Users", userSchema);

/* show what's in the database
(alternatively can download mongoDB compass for a better UI)

1. mongosh
2. use fundtasy / show dbs
3. show collections
4. db.users.find().pretty()  db.{COLLECTION_NAME}.find().pretty()
- Delete all data db.dropDatabase()
*/
