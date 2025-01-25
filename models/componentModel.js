const mongoose = require('mongoose');

// const optionSchema = new mongoose.Schema({
//   name: String,
//   defaultTime: Number,
// });

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
});

// const optionSchema = new mongoose.Schema({
//   name: String,
//   defaultTime: Number,
// });

// const componentSchema = new mongoose.Schema({
//   name: String,
//   defaultTime: Number,
//   defaultElements: String,
//   referenceLink: String,
//   options: [optionSchema], // Array of options
// });

//console.log(componentSchema);

const Component = mongoose.model('iculist', componentSchema);
const Hospital = mongoose.model('hospital', hospitalSchema);

//module.exports = Component;

module.exports = {
  Component,
  Hospital,
};

console.log("tests"+Component)
