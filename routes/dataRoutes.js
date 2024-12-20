const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ICUdetails = require("../models/dataModel");

async function fetchData() {
  try {
    const ICUdetails = await ICUdetails.find(); // Fetch all documents in the collection
    console.log("Data from the collection:", ICUdetails);
  } catch (err) {
    console.error("Error fetching data:", err);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

router.get("/:id", getData, (req, res) => {
  res.json(res.icudetail);
});

async function getData(req, res, next) {
  try {
    const icudetail = await ICUdetails.findById(req.params.id);
    if (icudetail == null) {
      return res.status(404).json({ message: "data not found" });
    }
    res.icudetail = icudetail;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


