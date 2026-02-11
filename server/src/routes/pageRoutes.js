const express = require("express");
const { submitServiceInquiry } = require("../controllers/serviceController");

const router = express.Router();

router.post("/submit", submitServiceInquiry);

module.exports = router;
