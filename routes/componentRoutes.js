const express = require("express");
const router = express.Router();
const Component = require("../models/componentModel");

// Middleware for logging incoming requests
/*router.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.path}`);
  next();
});*/


// Welcome message for the /components route
router.get("/", async (req, res) => {
  try {
    const components = await Component.find();
    res.json(components);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getComponent(req, res, next) {
  try {
    const component = await Component.findById(req.params.id);
    if (component == null) {
      return res.status(404).json({ message: "Component not found" });
    }
    res.component = component;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } 
}

module.exports = router;
