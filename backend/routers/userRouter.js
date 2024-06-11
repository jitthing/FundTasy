const express = require("express");
const { getUser, create_account } = require("../controllers/userController");

const router = express.Router();

router.post("/login", getUser);
router.post("/create_account", create_account);

module.exports = router;
