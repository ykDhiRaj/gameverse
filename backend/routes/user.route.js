const express = require('express');
const{login,signup,addToFavorites,addToWishlist,deleteAccount}  = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// User authentication routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes (require authentication)
router.delete("/delete", authMiddleware, deleteAccount);
router.post("/wishlist", authMiddleware, addToWishlist);
router.post("/favorites", authMiddleware, addToFavorites);

module.exports = router;