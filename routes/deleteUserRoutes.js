const express = require("express");
const router = express.Router();
const {Users} = require("../models/componentModel");

router.delete("/", async (req, res) => {
  try {
    const { _id } = req.body; // Corrected: Get _id from req.body

    if (!_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const deletedUser = await Users.findByIdAndDelete(_id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Error deleting user" });
  }
});

module.exports = router;
