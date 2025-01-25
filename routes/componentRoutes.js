const express = require("express");
const router = express.Router();
const Component = require("../models/componentModel");

// Middleware for logging incoming requests
/*router.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.path}`);
  next();
});*/

console.log("components" + Component.find());
// Welcome message for the /components route
router.get("/", async (req, res) => {
  try {
    const components = await Component.find();
    console.log("components" + components)
    res.json(components);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




// Get a single component
router.get("/:id", getComponent, (req, res) => {
  res.json(res.component);
});

// Create a component
router.post("/", async (req, res) => {
  const { name, defaultTime, defaultElements, referenceLink, options } =
    req.body;

  const component = new Component({
    name,
    defaultTime,
    defaultElements,
    referenceLink,
    options: options.map((option) => ({
      name: option.name,
      defaultTime: option.defaultTime,
    })),
  });

  try {
    const newComponent = await component.save();
    res.status(201).json(newComponent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a component
router.patch("/update/:id", getComponent, async (req, res) => {
  const { name, defaultElements, referenceLink, defaultTime, options } =
    req.body;

  console.log("Received update request for ID:", req.params.id);
  console.log("Request Body:", req.body);

  if (name != null) {
    res.component.name = name;
    console.log("Updated name to:", name);
  }
  if (defaultTime != null) {
    res.component.defaultTime = defaultTime;
    console.log("Updated defaultTime to:", defaultTime);
  }
  if (defaultElements != null) {
    res.component.defaultElements = defaultElements;
    console.log("Updated defaultElements to:", defaultElements);
  }
  if (referenceLink != null) {
    res.component.referenceLink = referenceLink;
    console.log("Updated referenceLink to:", referenceLink);
  }
  if (options != null) {
    res.component.options = options.map((option) => ({
      name: option.name,
      defaultTime: option.defaultTime,
    }));
    console.log("Updated options to:", res.component.options);
  }

  try {
    const updatedComponent = await res.component.save();
    console.log("Successfully updated component:", updatedComponent);
    res.json(updatedComponent);
  } catch (error) {
    console.error("Error saving updated component:", error.message);
    res.status(400).json({ message: error.message });
  }
});


// Delete a component
router.delete("/delete/:id", async (req, res) => {
  try {
    console.log("Route Deleting component with ID:", req.params.id);
    const deletedComponent = await Component.findByIdAndDelete(req.params.id);
    res.json(deletedComponent);
  } catch (error) {
    console.error("Routes Error deleting component:", error);
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
