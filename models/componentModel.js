const mongoose = require('mongoose');

// const optionSchema = new mongoose.Schema({
//   name: String,
//   defaultTime: Number,
// });

// const componentSchema = new mongoose.Schema({
//   name: String,
//   totalBeds: Number,
//   occupiedBeds: Number,
//   reserveBeds: Number,
//   availableBeds: Number,
// });

const optionSchema = new mongoose.Schema({
  name: String,
  defaultTime: Number,
});

const componentSchema = new mongoose.Schema({
  name: String,
  defaultTime: Number,
  defaultElements: String,
  referenceLink: String,
  options: [optionSchema], // Array of options
});

//console.log(componentSchema);

const Component = mongoose.model('Component', componentSchema);

module.exports = Component;

console.log("tests"+Component)
