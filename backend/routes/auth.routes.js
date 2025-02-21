const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { verifyUser } = require("../controllers/auth.controller");

router.get("/verify", authMiddleware, verifyUser);

module.exports = router;
