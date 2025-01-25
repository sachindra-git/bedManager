const express = require("express");
const router = express.Router();
const {Hospital} = require("../models/componentModel");

router.get("/", async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    console.log("Hospitals:", hospitals);
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
