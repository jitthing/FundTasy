const express = require("express");
const {
  resetPassword,
  create_account,
  authenticateUser,
  google_login,
  getAllModels,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", authenticateUser);
router.post("/create_account", create_account);
router.post("/forgot_password", resetPassword);
router.post("/google_login", google_login);
router.post("/all_models", getAllModels);
router.get('/protected', protect, (req, res) => { res.json({ message: 'On the protected route', user: req.user }); });

module.exports = router;
