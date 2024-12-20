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
