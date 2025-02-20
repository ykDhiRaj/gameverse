const express = require("express");
const { getGameVideos } = require("../controllers/gameVideosController");

const router = express.Router();

router.get("/", getGameVideos);

module.exports = router;
