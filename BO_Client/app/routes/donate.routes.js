module.exports = app => {
  const donate = require("../controllers/donate.controller.js");

  var router = require("express").Router();

  // add a new donation
  router.post("/add", donate.create);

  // Retrieve user donation for all fund
  router.get("/", donate.findAll);
  
  // Retrieve user donation for all fund
  router.get("/user/:id", donate.findbyFundUser);

  // Retrieve donation for one Fund
  router.get("/fund/:id", donate.findbyFundId);

  app.use('/api/donate', router);
};