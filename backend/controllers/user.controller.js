const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup a new user
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    bcrypt.genSalt(10, function (err, salt) {
      if (err) return res.status(500).json({ msg: "Server error", error: err });

      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.status(500).json({ msg: "Server error", error: err });

        const createdUser = await User.create({
          username,
          email,
          password: hash,
        });

        const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({ email, token });
      });
    });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong", error });
  }
};

// Login an existing user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User doesn't exist" });
    }

    bcrypt.compare(password, user.password, async function (err, result) {
      if (err) return res.status(500).json({ msg: "Server error", error: err });

      if (!result) {
        return res.status(400).json({ msg: "Incorrect credentials" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      

      res.status(200).json({ email, token });
    });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong", error });
  }
};

// Delete user account
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming authentication middleware sets req.user
    

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await User.findByIdAndDelete(userId);
    res.status(200).json({ msg: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// Add game to wishlist
const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { gameId } = req.body;

    if (!gameId) {
      return res.status(400).json({ msg: "Game ID is required" });
    }

    const user = await User.findByIdAndUpdate(userId, { $addToSet: { wishlist: gameId } }, { new: true });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(201).json({ msg: "Game added to wishlist" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// Add game to favorites
const addToFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const { gameId } = req.body;

    if (!gameId) {
      return res.status(400).json({ msg: "Game ID is required" });
    }

    const user = await User.findByIdAndUpdate(userId, { $addToSet: { favorites: gameId } }, { new: true });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(201).json({ msg: "Game added to favorites" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// Add this function to your existing user.controller.js
const getUserData = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming authentication middleware sets req.user
    const user = await User.findById(userId).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

module.exports = {
  signup,
  login,
  deleteAccount,
  addToWishlist,
  addToFavorites,
  getUserData,
};
