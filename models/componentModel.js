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


const Component = mongoose.model('icuList', componentSchema);

console.log("ComponentComponent" + Component) 

module.exports = Component;


