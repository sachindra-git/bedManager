const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect(
  "mongodb+srv://supunadmin:T394Gh54Vd9pO121@cluster01.leeclw9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});



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
    console.log('Data from the database aaaaaaaaaaaa:', icudata);
  } catch (err) {
    console.error('Error fetching data:', err);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

fetchData();
