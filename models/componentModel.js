const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
  name: String,
  totalBeds: Number,
  occupiedBeds: Number,
  reserveBeds: Number,
  availableBeds: Number,
});

const hospitalSchema = new mongoose.Schema({
  name: String,
  totalIcus: Number,
  contact: String,
  district: String,
  province: String
});
const bedreqSchema = new mongoose.Schema({
  date: Date,
  patientName: String,
  patientAge: Number,
  hospitalName: String,
  wardNumber: Number,
  patientStatus: String,
  bedRequestStatus: String
});


const Component = mongoose.model('iculist', componentSchema);
const Hospital = mongoose.model('hospital', hospitalSchema);
const Bedreq = mongoose.model('bedreq', bedreqSchema);

//module.exports = Component;

module.exports = {
  Component,
  Hospital,
  Bedreq
};