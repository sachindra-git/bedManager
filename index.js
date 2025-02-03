const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware
const path = require("path"); // Import the path module
const {Icu} = require("../models/componentModel");

const app = express();
const port = process.env.PORT || 5000; 

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // Serve index.html as the default page
});

// ICU Routes
const componentRoutes = require("./routes/componentRoutes");
app.use("/icus", componentRoutes);

const hospitalRoutes = require("./routes/hospitalRoutes");
app.use("/hospitals", hospitalRoutes);

const bedRequestRoutes = require("./routes/bedRequestRoutes");
app.use("/bedreq", bedRequestRoutes);

// const icuUpdate = require("./routes/updateIcuRoutes");
// app.use("/update", icuUpdate);

// app.post('/update', (req, res) => {
//   const { icuName, contactNumber, totalBeds, occupiedBeds, reserveBeds, availableBeds } = req.body;

//   // Update the ICU information in the database (this example assumes you're updating by ICU name)
//   Icu.findOneAndUpdate(
//     { icuName: icuName }, // Search by ICU name
//     {
//       contactNumber,
//       totalBeds,
//       occupiedBeds,
//       reserveBeds,
//       availableBeds
//     }, 
//     { new: true, upsert: true }, // Return the updated document or insert if not found
//     (err, updatedICU) => {
//       if (err) {
//         console.log('Error updating ICU:', err);
//         return res.status(500).send('Error updating ICU');
//       }
//       res.send(`ICU updated successfully: ${updatedICU}`);
//     }
//   );
// });


// MongoDB connection
mongoose.connect(
  "mongodb+srv://chathurangawijayarathneeb:AzSMaBPouG5uLxEY@cluster01.nzv8k.mongodb.net/bedManager?retryWrites=true&w=majority&appName=bedManager",
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

