module.exports = app => {
    const fund = require("../controllers/fund.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/add", fund.create);

    // Retrieve all Tutorials
    router.get("/", fund.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/org/:orgid", fund.findByOrg);

    // Retrieve a single Tutorial with id
    router.get("/:id", fund.findOneId);

    // Update a Tutorial with id
    router.put("/:id", fund.update);

    // Delete a Tutorial with id
    router.delete("/deleteAll", fund.deleteAll);

    // Delete a Tutorial with id
    router.delete("/:id", fund.delete);

  
    app.use('/api/fund', router);
  };