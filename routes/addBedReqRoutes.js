const express = require("express");
const router = express.Router();
const {Bedreq} = require("../models/componentModel");

router.get("/", async (req, res) => {
  try {
    const bedreq = await Bedreq.find();
    res.json(bedreq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
