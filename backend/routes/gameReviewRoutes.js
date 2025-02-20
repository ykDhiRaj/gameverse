const express = require("express");
const { getGameReviews } = require("../controllers/gameReviewController");

const router = express.Router();

router.get("/", getGameReviews);

module.exports = router;
