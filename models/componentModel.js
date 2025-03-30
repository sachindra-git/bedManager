const mongoose = require('mongoose');

const icuSchema = new mongoose.Schema({
  name: String,
  totalBeds: Number,
  occupiedBeds: Number,
  reserveBeds: Number,
  availableBeds: Number,
  contact: String
});

const hospitalSchema = new mongoose.Schema({
  name: String,
  totalIcus: Number,
  contact: String,
  district: String,
  province: String
});
const bedreqSchema = new mongoose.Schema({
  reqDate: Date,
  patientName: String,
  patientAge: Number,
  hospitalName: String,
  wardNumber: Number,
  patientStatus: String,
  bedRequestStatus: String
});


const Icu = mongoose.model('iculist', icuSchema);
const Hospital = mongoose.model('hospital', hospitalSchema);
const Bedreq = mongoose.model('bedreq', bedreqSchema);

//module.exports = Component;

module.exports = {
  Icu,
  Hospital,
  Bedreq
};