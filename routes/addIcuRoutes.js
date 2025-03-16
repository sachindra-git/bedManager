const express = require("express");
const router = express.Router();
const {Addicu} = require("../models/componentModel");



// Welcome message for the /components route
router.get("/", async (req, res) => {
  try {
    const icus = await Addicu.find();
    res.json(icus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
