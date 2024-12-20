const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware
const path = require("path"); // Import the path module

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

// Component Routes
const componentRoutes = require("./routes/componentRoutes");
app.use("/components", componentRoutes);



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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
