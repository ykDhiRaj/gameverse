const express = require("express");
const { getGameReviews } = require("../controllers/gameReview.controller");

const router = express.Router();

router.get("/", getGameReviews);

module.exports = router;
