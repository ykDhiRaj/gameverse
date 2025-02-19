const express = require('express');
const{login,signup,addToFavorites,addToWishlist,deleteAccount,getUserData,removeFromFavorites,removeFromWishlist}  = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// User authentication routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes (require authentication)
router.delete("/delete", authMiddleware, deleteAccount);
router.post("/wishlist", authMiddleware, addToWishlist);
router.post("/favorites", authMiddleware, addToFavorites);
router.get("/userprofile", authMiddleware, getUserData);

// Remove game from wishlist
router.delete("/wishlist/remove", authMiddleware, removeFromWishlist);

// Remove game from favorites
router.delete("/favorites/remove", authMiddleware, removeFromFavorites);

module.exports = router;