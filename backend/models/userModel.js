const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
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
