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
  updateCoinBalance,
  updateBankBalance,
  updateTotalSaving,
  updateIncome,
  getAllUsernames
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
  editTransaction,
  fetchTransaction,
} = require("../controllers/transactionController");

const {
  getActiveItems,
  addActiveItem,
  deleteActiveItem,
  updateSavedValue,
  getAllGoals,
} = require("../controllers/activeGoalsController");

const {
  getAllOwnedPigs,
  buyPig,
} = require("../controllers/ownedPigsController");

const {
  newCoinTransaction,
  getCoinTransactions,
} = require("../controllers/coinTransactionController");

const {
    newFriendRequest,
    fetchFriendRequests,
    acceptFriendRequest,
    fetchFriends, 
    deleteFriendRequest
} = require("../controllers/friendsRelationsController");

const router = express.Router();

// User Routers
router.post("/login", authenticateUser);
router.post("/google_login", google_login);
router.post("/create_account", create_account);
router.post("/update_user_info", updateUserInfo);
router.post("/update_income", updateIncome);
router.get("/user_info", userInfo);
router.get("/get_usernames", getAllUsernames);

router.post("/update_display_pig", updateDisplayPig);
router.post("/update_coinbalance", updateCoinBalance);
router.post("/update_bankbalance", updateBankBalance);
router.post("/update_totalsaving", updateTotalSaving);

// Model Router
router.post("/all_models", getAllModels);
router.post("/newModel", create_model);

// OwnedPigs Router
router.get("/get_owned_pigs", getAllOwnedPigs);
router.post("/buy_pig", buyPig);

// Amazon Scraper Router
router.post("/scrape_amazon", scrapeAmazon);

// Wishlist Router
router.get("/all_wishlist_items", getAllItems);
router.post("/add_wishlist_item", addItem);
router.delete("/delete_wishlist_item/:id", deleteItem);

// Active Goals Router
router.get("/all_active_items", getActiveItems);
router.get("/all_goals", getAllGoals);
router.post("/add_active_goal", addActiveItem);
router.delete("/delete_active_goal/:id/:amount", deleteActiveItem);
router.post("/update_saved_amount", updateSavedValue);

// Transaction Router
router.post("/new_transaction", newTransaction);
router.get("/all_transactions", allTransactions);
router.delete("/delete_transaction/:id", deleteTransaction);
router.put("/edit_transaction/:id", editTransaction);
router.get("/fetch_transaction/:id", fetchTransaction);

// Coin Transaction Router
router.get("/all_coin_transactions", getCoinTransactions);
router.post("/new_coin_transaction", newCoinTransaction);

// Friends Relations Router
router.post("/new_friend_request", newFriendRequest);
router.get("/fetch_friend_requests", fetchFriendRequests);
router.post("/accept_friend_request", acceptFriendRequest);
router.get("/fetch_friends", fetchFriends);
router.delete("/delete_friend_request", deleteFriendRequest);

// Protected Route
router.get("/protected", protect, (req, res) => {
  res.json({ message: "On the protected route", user: req.user });
});

router.post("/forgot_password", forgotPassword); //forget password step 1
router.get("/validate_reset_token/:userId/:token", validateResetToken); //step 2 check token validity
router.post("/updatepassword", updatePassword); //update password in db step 3

module.exports = router;
