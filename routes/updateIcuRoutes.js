const express = require("express");
const router = express.Router();
const {Icu} = require("../models/componentModel");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Welcome message for the /components route
router.get("/", async (req, res) => {
  try {
    const icus = await Icu.find();
    res.json(icus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//DB Update
app.post('/update', (req, res) => {
  const { icuName, contactNumber, totalBeds, occupiedBeds, reserveBeds, availableBeds } = req.body;

  // Update the ICU information in the database (this example assumes you're updating by ICU name)
  ICU.findOneAndUpdate(
    { icuName: icuName }, // Search by ICU name
    {
      contactNumber,
      totalBeds,
      occupiedBeds,
      reserveBeds,
      availableBeds
    }, 
    { new: true, upsert: true }, // Return the updated document or insert if not found
    (err, updatedICU) => {
      if (err) {
        console.log('Error updating ICU:', err);
        return res.status(500).send('Error updating ICU');
      }
      res.send(`ICU updated successfully: ${updatedICU}`);
    }
  );
});

module.exports = router;
