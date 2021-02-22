module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Register a new Tutorial
    router.post("/registerUser", user.create);
    // Create a new Tutorial
    router.post("/createUser", user.create);

    // Create a new Tutorial
    router.post("/login", user.login);
  
    // Retrieve all Tutorials
    router.get("/", user.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", user.findOneId);
  
    // Update a Tutorial with id
    router.put("/:id", user.update);

    
    // Delete a Tutorial with id
    router.delete("/deleteAll", user.deleteAll);

    // Delete a Tutorial with id
    router.delete("/:id", user.delete);

  
    app.use('/api/user', router);
  };