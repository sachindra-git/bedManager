const mongoose = require('mongoose');

// MongoDB connection URI
const uri = 'mongodb+srv://chathurangawijayarathneeb:HNesZUAawQsCOkl3@cluster01.nzv8k.mongodb.net/?retryWrites=true&w=majority&appName=bedManager';

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a schema
const userSchema = new mongoose.Schema({
  name: String,
  totalBeds: Number,
  occupiedBeds: Number,
  reserveBeds: Number,
  availableBeds: Number,
});

// Create a model
const icuList = mongoose.model('icuList', userSchema);

// Fetch and print data
async function fetchData() {
  try {
    const icudata = await icuList.find(); // Fetch all documents from the "users" collection
    console.log('Data from the database:', icudata);
  } catch (err) {
    console.error('Error fetching data:', err);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

fetchData();
