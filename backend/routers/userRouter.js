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
  updateDisplayPig,
  updateBankBalance,
  updateCoinBalance,
  getMonthlyIncome,
} = require("../controllers/userController");

const {
  getAllModels,
  create_model,
} = require("../controllers/modelController");
const { protect } = require("../middleware/authMiddleware");
const { scrapeAmazon } = require("../webScraper");
const {
  getAllItems,
  addItem,
  deleteItem,
} = require("../controllers/wishlistController");
const {
  newTransaction,
  allTransactions,
  deleteTransaction,
} = require("../controllers/transactionController");
const {
  getActiveItems,
  addActiveItem,
  deleteActiveItem,
  updateSavedValue,
} = require("../controllers/activeGoalsController");

const router = express.Router();

// User Routers
router.post("/login", authenticateUser);
router.post("/google_login", google_login);
router.post("/create_account", create_account);
router.post("/update_user_info", updateUserInfo);
router.get("/user_info", userInfo);

router.get("/monthly_income", getMonthlyIncome);
router.post("/update_display_pig", updateDisplayPig);
router.post("/update_bankbalance", updateBankBalance);
router.post("/update_coinbalance", updateCoinBalance);

// Model Router
router.post("/all_models", getAllModels);
router.post("/newModel", create_model);

// Amazon Scraper Router
router.post("/scrape_amazon", scrapeAmazon);

// Wishlist Router
router.get("/all_wishlist_items", getAllItems);
router.post("/add_wishlist_item", addItem);
router.delete("/delete_wishlist_item/:id", deleteItem);

// Active Goals Router
router.get("/all_active_items", getActiveItems);
router.post("/add_active_goal", addActiveItem);
router.delete("/delete_active_goal/:id/:amount", deleteActiveItem);
router.post("/update_saved_amount", updateSavedValue);

// Transaction Router
router.post("/new_transaction", newTransaction);
router.get("/all_transactions", allTransactions);
router.delete("/delete_transaction/:id", deleteTransaction);

router.get("/protected", protect, (req, res) => {
  res.json({ message: "On the protected route", user: req.user });
});

router.post("/forgot_password", forgotPassword); //forget password step 1
router.get("/validate_reset_token/:userId/:token", validateResetToken); //step 2 check token validity
router.post("/updatepassword", updatePassword); //update password in db step 3

module.exports = router;
