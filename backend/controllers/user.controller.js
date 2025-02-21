const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup a new user
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const takenUsername = await User.findOne({username:username});
    if(takenUsername){
      return res.status(400).json({msg: "Username already taken"});
    }
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

// Updating the username
const updateUsername = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username } = req.body;
   

    // Fetch the existing user data
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Handle username update
    if (username && username !== user.username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ msg: "Username already taken" });
      }
      
    } else if (username === user.username) {

      return res.status(400).json({ msg: "New username cannot be the same as the current one" });

    }
    user.username = username;
    await user.save();
    res.status(200).json({ msg: "Username updated successfully", user });
    
  }catch (error) {
    res.status(500).json({ msg: "Server error", error });
    }
}

// Updating the password
const updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    // Fetch the existing user data
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    // Handle password update
    if (currentPassword && newPassword) {
      const passwordMatch = await bcrypt.compare(currentPassword, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ msg: "Current password is incorrect" });
      }
      if (currentPassword === newPassword) {
        return res.status(400).json({ msg: "New password cannot be the same as the current password" });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }
    // Save updates
    await user.save();
    res.status(200).json({ msg: "Password updated successfully", user });
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

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user.wishlist.includes(gameId)) {
      return res.status(400).json({ msg: "Game already exists in wishlist" });
    }

    user.wishlist.push(gameId);
    await user.save();

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

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user.favorites.includes(gameId)) {
      return res.status(400).json({ msg: "Game already exists in favorites" });
    }

    user.favorites.push(gameId);
    await user.save();

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
    const userData = {
      ...user.toObject(),
      wishlistCount: user.wishlist.length,
      favoritesCount: user.favorites.length,
    };
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// Remove game from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { gameId } = req.body;

    if (!gameId) {
      return res.status(400).json({ msg: "Game ID is required" });
    }

    const user = await User.findByIdAndUpdate(userId, { $pull: { wishlist: gameId } }, { new: true });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "Game removed from wishlist" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// Remove game from favorites
const removeFromFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const { gameId } = req.body;

    if (!gameId) {
      return res.status(400).json({ msg: "Game ID is required" });
    }

    const user = await User.findByIdAndUpdate(userId, { $pull: { favorites: gameId } }, { new: true });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "Game removed from favorites" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

const getUser = async (req,res)=>{
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    if(!user){
      return res.status(404).json({msg:"User not found"});
    } 
    res.status(200).json(user);
   } catch (error) {
    res.status(500).json({msg:"Server error",error});}
}



module.exports = {
  signup,
  login,
  getUser,
  deleteAccount,
  addToWishlist,
  addToFavorites,
  getUserData,
  removeFromWishlist,
  removeFromFavorites,
  updateUsername,
  updatePassword
};
