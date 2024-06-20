const express = require("express");
const {
  resetPassword,
  create_account,
  authenticateUser,
  google_login,
} = require("../controllers/userController");

const {
  getAllModels,
  create_model,
} = require("../controllers/modelController");
const { protect } = require("../middleware/authMiddleware");
const { scrapeAmazon } = require("../webScraper");
const { getAllItems, addItem } = require("../controllers/wishlistController");

const router = express.Router();

// User Routers
router.post("/login", authenticateUser);
router.post("/create_account", create_account);
router.post("/forgot_password", resetPassword);
router.post("/google_login", google_login);

// Model Routers
router.post("/all_models", getAllModels);
router.post("/newModel", create_model);

// Amazon Scraper Router
router.post("/scrape_amazon", scrapeAmazon);

// Wishlist Router
router.post("/all_wishlist_items", getAllItems);
router.post("/add_wishlist_item", addItem);

router.get("/protected", protect, (req, res) => {
  res.json({ message: "On the protected route", user: req.user });
});

module.exports = router;
