const express = require("express");
const {
  updatePassword,
  create_account,
  authenticateUser,
  google_login,
  forgotPassword,
  userInfo,
  validateResetToken,
  updateUserInfo,
  updateDisplayPig
} = require("../controllers/userController");

const {
  getAllModels,
  create_model,
} = require("../controllers/modelController");
const { protect } = require("../middleware/authMiddleware");
const { scrapeAmazon } = require("../webScraper");
const { getAllItems, addItem } = require("../controllers/wishlistController");
const { newTransaction, allTransactions } = require("../controllers/transactionController");
const {
  getActiveItems,
  addActiveItem,
} = require("../controllers/activeGoalsController");

const router = express.Router();

// User Routers
router.post("/login", authenticateUser);
router.post("/google_login", google_login);
router.post("/create_account", create_account);
router.post("/update_user_info", updateUserInfo);
router.get("/user_info", userInfo);

router.post("/all_models", getAllModels);
router.post("/newModel", create_model);
router.post("/update_display_pig", updateDisplayPig);

// Amazon Scraper Router
router.post("/scrape_amazon", scrapeAmazon);

// Wishlist Router
router.get("/all_wishlist_items", getAllItems);
router.post("/add_wishlist_item", addItem);

// Active Goals Router
router.get("/all_active_items", getActiveItems);
router.post("/add_active_goal", addActiveItem);

// Transaction Router
router.post("/new_transaction", newTransaction);
router.get("/all_transactions", allTransactions);

router.get("/protected", protect, (req, res) => {
  res.json({ message: "On the protected route", user: req.user });
});

router.post("/forgot_password", forgotPassword); //forget password step 1
router.get("/validate_reset_token/:userId/:token", validateResetToken); //step 2 check token validity
router.post("/updatepassword", updatePassword); //update password in db step 3

module.exports = router;
