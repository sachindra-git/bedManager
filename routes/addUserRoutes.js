const express = require("express");
const router = express.Router();
const {Users} = require("../models/componentModel");

router.get("/", async (req, res) => {
  try {
    const user = await Users.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;