const express = require("express");
const { getGameVideos } = require("../controllers/gameVideos.controller");

const router = express.Router();

router.get("/", getGameVideos);

module.exports = router;
