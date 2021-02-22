const db = require("../models");
const donate = db.donate;

// Create and Save a new fund
exports.create = (req, res) => {

  // Create fund from Form Values
  const donateAdd = new donate({   // création mta" variable donate ib les valeur ili t3adew fil requete
    userid: req.body.userid,
    fundid: req.body.fundid,
    amount: req.body.amount,
    anomyme: req.body.anomyme
  });

  // Save fund in the database
  donateAdd
    .save(donateAdd) // bich nsaviw el donate 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the Donation."
      });
    });
};


// Retrieve all funds from the database.
exports.findAll = (req, res) => {

  donate.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Donation."
      });
    });
};

// Find a single fund with an id
exports.findbyFundUser = (req, res) => {
  const idVar = req.params.id; //te5ou el id ili t3ada fil URL / fil requete 

  donate.find({ userid: idVar }, function (err, result) { // te5ou user id ou ta3mel recherche a3lih 
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting Donation for user id= " + idVar
      });
    } else {
      if (!result)
        res.send('No donation matching this user Id');
      else
        res.send(result);
    }
  });
};

exports.findbyFundId = (req, res) => {
  const idVar = req.params.id; //te5ou el id ili t3ada fil URL / fil requete 

  donate.find({ fundid: idVar }, function (err, result) { // te5ou fund id ou ta3mel recherche a3lih 
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting Donation for fund id= " + idVar
      });
    } else {
      if (!result)
        res.send('No donation matching this fund Id');
      else
        res.send(result);
    }
  });
};