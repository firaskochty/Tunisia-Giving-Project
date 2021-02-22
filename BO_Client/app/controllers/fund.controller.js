const db = require("../models");
const fund = db.fund;

// Create and Save a new fund
exports.create = (req, res) => {
  // Validate request   bich nchoufou ili t3adet 7aja fil requete
  if (!req.body.orgid || !req.body.name || !req.body.description || !req.body.amount || !req.body.datefin ) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create fund from Form Values
  const fundAdd = new fund({ // création mta3 variable donate ib les valeur ili t3adew fil requete
    orgid: req.body.orgid,
    name: req.body.name,
    description: req.body.description,
    amount: req.body.amount,
    datefin: req.body.datefin,
    picture: 'pic_fund_def.jpg'
  });

  // Save fund in the database
  fundAdd
    .save(fundAdd)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Fund."
      });
    });
};


// Retrieve all funds from the database.
exports.findAll = (req, res) => {

  fund.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving fund."
      });
    });
};

// Find a single fund with an id
exports.findOneId = (req, res) => {
  const idVar = req.params.id;

  fund.findOne({ _id: idVar }, function (err, result) {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting Fund id= " + idVar
      });
    } else {
      if (!result)
        res.send('No fund matching this Id');
      else
        res.send(result);
    }
  });
};

// Find a single fund with an id
exports.findByOrg = (req, res) => {
  const idVar = req.params.orgid;

  fund.find({ orgid: idVar }, function (err, result) {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting Fund id= " + idVar
      });
    } else {
      if (!result)
        res.send('No fund matching this Id');
      else
        res.send(result);
    }
  });
};

// Update a fund by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  
  fund.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update fund with id=${id}. Maybe fund was not found!`
        });
      } else res.send({ message: "Fund was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Fund with id=" + id
      });
    });
};


// Delete a fund with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  fund.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete fund with id=${id}. Maybe fund was not found!`
        });
      } else {
        res.send({
          message: "fund was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete fund with id=" + id
      });
    });
};


exports.deleteAll = (req, res) => {
  fund.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} funds were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all funds."
      });
    });
};