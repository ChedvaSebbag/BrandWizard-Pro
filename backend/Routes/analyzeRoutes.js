const express = require("express");
const router = express.Router();
const { analyzeController } = require("../Controllers/analyzeController");

router.post("/", analyzeController);

module.exports = router;
