const express = require("express");
const router = express.Router();
const ICUdetails = require("../models/dataModel");

router.get("/", async (req, res) => {
  try {
    const icuData = await ICUdetails.find();
    res.json(icuData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});