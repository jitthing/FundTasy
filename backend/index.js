const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const Users = require("./models/userModel");
const Models = require("./models/modelModel");
require("dotenv").config();

// Server settings
const PORT = 8000;
const app = express();
// const DB_URL = "mongodb://127.0.0.1:27017/fundtasy"; // to use for Local Machine
const DB_URL = process.env.DB_URL; // to use for container deployment

app.use(express.json()); // Tells our server to read and understand JSON objects
app.use(cors()); // Tells the server to allow communication across origins

// Connecting to the DB
mongoose.connect(DB_URL);

// Verify connection status to DB
const db = mongoose.connection;
db.on("error", () => {
  console.log("[ERROR ] Failed to connect to DB!");
});
db.once("open", () => {
  console.log("[SYSTEM] Connected to MongoDB successfully!");
});

// Health check endpoint
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Server is up and running!",
  });
});

app.use("/", require("./routers/userRouter"));

app.listen(PORT, () => {
  console.log(`[SYSTEM] Server started on port ${PORT}...`);
});

// Models Importer
const importData = async () => {
  try {
    // Clearing the collection
    await Models.deleteMany({});

    // Reading the JSON file
    const data = JSON.parse(fs.readFileSync("fundtasy-models.json", "utf-8"));

    // Inserting data into the collection
    await Models.insertMany(data);
    console.log("Data successfully imported!");

    // Closing the database connection
    // mongoose.disconnect();
  } catch (err) {
    console.error("Error importing data:", err);
    // mongoose.disconnect();
  }
};

importData();

// Task scheduler
var cron = require("node-cron");
cron.schedule(
  "0 0 * * *",
  async function () {
    try {
      await Users.updateMany(
        { income: { $gt: 0 } }, // get users with income > 0
        [
          {
            $set: {
              bankBalance: {
                $add: ["$bankBalance", { $divide: ["$income", 30] }],
              },
              totalSaving: {
                $add: ["$totalSaving", { $divide: ["$income", 30] }],
              },
            },
          }, // add income/30 to bank balance and total saving
        ]
      );
    } catch (err) {
      console.log(err);
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Singapore",
  }
);
