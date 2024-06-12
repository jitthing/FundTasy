const express = require("express");
const {
  resetPassword,
  create_account,
  authenticateUser,
  google_login,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", authenticateUser);
router.post("/create_account", create_account);
router.post("/forgot_password", resetPassword);
router.post("/google_login", google_login);

module.exports = router;
