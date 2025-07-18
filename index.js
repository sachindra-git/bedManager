const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require('crypto');
const session = require('express-session');
const cors = require("cors"); // Import the cors middleware
const path = require("path"); // Import the path module
const {Icu, Hospital, Bedreq, Users} = require("./models/componentModel");

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

const addIcu = require("./routes/addIcuRoutes");
app.use("/add", addIcu);

const addHospital = require("./routes/addHospitalRoutes");
app.use("/addHospital", addHospital);

const addBedReq = require("./routes/addBedReqRoutes");
app.use("/addBedReq", addBedReq);

const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

const changePasswordRoutes = require("./routes/changePasswordRoutes");
app.use("/changePassword", changePasswordRoutes);

const addUserRoutes = require("./routes/addUserRoutes");
app.use("/addUser", addUserRoutes);

const deleteUserRoutes = require("./routes/deleteUserRoutes");
app.use("/deleteUser", deleteUserRoutes);

app.post("/add", async (req, res) => {
  try {
    const { name, totalBeds, occupiedBeds, reserveBeds, availableBeds, contact } = req.body;

    // Create a new ICU instance
    const newIcu = new Icu({
      name,
      totalBeds,
      occupiedBeds,
      reserveBeds,
      availableBeds,
      contact,
    });

    // Save it to the database
    const savedIcu = await newIcu.save();

    res.status(201).json({ message: `${savedIcu.name} added successfully`, data: savedIcu });
  } catch (err) {
    console.error("Error adding ICU:", err);
    res.status(500).json({ message: "Error adding ICU" });
  }
});

app.post("/addUser", async (req, res) => {
  try {
    const { userName, password, userType } = req.body;

    // Create a new ICU instance
    const newUsers = new Users({
      userName,
      password,
      userType
    });

    // Save it to the database
    const savedUser = await newUsers.save();

    res.status(201).json({ message: `${savedUser.name} added successfully` });
  } catch (err) {
    console.error("Error adding User:", err);
    res.status(500).json({ message: "Error adding User" });
  }
});


app.post('/changePassword', async (req, res) => {
  const { id, userName, password } = req.body;

  try {
    const changePassword = await Users.findOneAndUpdate(
      { _id: id },
      {
        userName,
        password
      },
      { new: true, upsert: true } // Return the updated document or insert if not found
    );

    res.send(`Password updated successfully`);
  } catch (err) {
    console.error('Error Changing Password:', err);
    res.status(500).send('Error Changing Password');
  }
});

app.post("/addHospital", async (req, res) => {
  try {
    const { name, totalIcus, contact, district, province } = req.body;

    // Create a new Hospital instance
    const newHospital = new Hospital({
      name,
      totalIcus,
      contact,
      district,
      province
    });

    // Save it to the database
    const savedHospital = await newHospital.save();

    res.status(201).json({ message: `${savedHospital.name} added successfully`, data: savedHospital });
  } catch (err) {
    console.error("Error adding Hospital:", err);
    res.status(500).json({ message: "Error adding Hospital" });
  }
});

app.post("/addBedReq", async (req, res) => {
  try {
    let { reqDate, patientName, patientAge, hospitalName, wardNumber, patientStatus, bedRequestStatus } = req.body;

    // Create a new Bedreq instance
    const newBedreq = new Bedreq({
      reqDate, // Save as Date object
      patientName,
      patientAge,
      hospitalName,
      wardNumber,
      patientStatus,
      bedRequestStatus
    });

    // Save to database
    const savednewBedreq = await newBedreq.save();
    res.status(201).json({ message: "Bed request added successfully", data: savednewBedreq });
  } catch (err) {
    console.error("Error adding Bed Request:", err);
    res.status(500).json({ message: "Error adding Bed Request", error: err.message });
  }
});


app.post('/update', async (req, res) => {
  const { id, name, contact, totalBeds, occupiedBeds, reserveBeds, availableBeds, updatedUser, updatedDate, updatedTime } = req.body;

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
        availableBeds,
        updatedUser,
        updatedDate,
        updatedTime
      },
      { new: true, upsert: true } // Return the updated document or insert if not found
    );

    res.send(`${updatedICU.name} updated successfully`);
  } catch (err) {
    console.error('Error updating ICU:', err);
    res.status(500).send('Error updating ICU');
  }
});

app.delete("/deleteUser", async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedUser = await Users.findOneAndDelete({ _id });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: `User deleted successfully` });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Error deleting user" });
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
