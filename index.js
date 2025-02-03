const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware
const path = require("path"); // Import the path module
const {Icu} = require("./models/componentModel");

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
const icuRoutes = require("./routes/icuRoutes");
app.use("/icus", icuRoutes);

const hospitalRoutes = require("./routes/hospitalRoutes");
app.use("/hospitals", hospitalRoutes);

const bedRequestRoutes = require("./routes/bedRequestRoutes");
app.use("/bedreq", bedRequestRoutes);

const icuUpdate = require("./routes/updateIcuRoutes");
app.use("/update", icuUpdate);

app.post('/update', async (req, res) => {
  const { id, name, contact, totalBeds, occupiedBeds, reserveBeds, availableBeds } = req.body;

  try {
    // Use async/await to update ICU info
    const updatedICU = await Icu.findOneAndUpdate(
      { _id: id }, // Search by ICU name
      {
        name,
        contact,
        totalBeds,
        occupiedBeds,
        reserveBeds,
        availableBeds
      },
      { new: true, upsert: true } // Return the updated document or insert if not found
    );

    res.send(`${updatedICU.name} updated successfully`);
  } catch (err) {
    console.error('Error updating ICU:', err);
    res.status(500).send('Error updating ICU');
  }
});


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
