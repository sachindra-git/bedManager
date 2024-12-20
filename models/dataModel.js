const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  name: String,
  totalBeds: Number,
  occupiedBeds: Number,
  reserveBeds: Number,
  availableBeds: Number,
});

const icuData = mongoose.model('data', dataSchema);

module.exports = icuData;