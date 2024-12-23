const mongoose = require('mongoose');

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

const Component = mongoose.model('testDB', componentSchema);

console.log("ComponentComponent" + Component) 

module.exports = Component;