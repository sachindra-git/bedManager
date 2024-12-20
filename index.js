const mongoose = require('mongoose');

// MongoDB Atlas URI (replace <username>, <password>, and <dbname>)
const uri = 'mongodb://chathurangawijayarathneeb:HNesZUAawQsCOkl3@cluster01.mongodb.net/bedManager?retryWrites=true&w=majority';

// Define a schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});


// Create a model
const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Fetch and print data
    fetchData();
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Function to fetch and print data
async function fetchData() {
  try {
    const users = await User.find(); // Fetch all documents in the "users" collection
    console.log('Data from database:', users);
  } catch (err) {
    console.error('Error fetching data:', err);
  } finally {
    mongoose.connection.close(); // Close the connection
  }
}
