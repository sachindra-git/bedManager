const mongoose = require('mongoose');
const app = require("express");
const router = app.Router();

// MongoDB connection
mongoose.connect(
  "mongodb+srv://chathurangawijayarathneeb:HNesZUAawQsCOkl3@cluster01.nzv8k.mongodb.net/?retryWrites=true&w=majority&appName=bedManager",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDBaaa");
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


// Route to Get Data from MongoDB and Return as JSON
app.get('/data', async (req, res) => {
  try {
    const icudata = await icuList.find(); // Fetch all users
    res.status(200).json(icudata); // Return data as JSON
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors
  }
});




// router.get("/", async (req, res) => {
//   try {
//     const iculist = await icuList.find();
//     res.json(iculist);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Fetch and print data
// async function fetchData() {
//   try {
//     const icudata = await icuList.find(); // Fetch all documents from the "users" collection
//     console.log('Data from the database aaaaaaaaaaaa:', icudata);
//   } catch (err) {
//     console.error('Error fetching data:', err);
//   } finally {
//     // Close the database connection
//     mongoose.connection.close();
//   }
//}

//fetchData();
