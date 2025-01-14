const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  name: String,
  defaultTime: Number,
});

const componentSchema = new mongoose.Schema({
  name: String,
  totalBeds: Number,
  occupiedBeds: Number,
  reserveBeds: Number,
  availableBeds: Number, // Array of options
});
//console.log(componentSchema)

const Component = mongoose.model('Component', componentSchema);

console.log("tests"+Component) 

module.exports = Component;


