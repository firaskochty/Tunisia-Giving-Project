const db = require("../models");
const user = db.user;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.mail || !req.body.phone || !req.body.password || !req.body.type) {
  

    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }


  if(!req.body.mail.includes("@")){
    res.status(400).send({ message: "please add a valid email!" });
    return

   }

   if(req.body.password.length < 6 ){
    res.status(400).send({ message: "Password must containt at lease 6 characters!" });
    return
   }

  // Create User from Form Values
  const userAdd = new user({
    name: req.body.name,
    mail: req.body.mail,
    phone: req.body.phone,
    password: req.body.password,
    picture: 'pic_def.jpg',
    type: req.body.type
  });

  // Save User in the database
  userAdd
    .save(userAdd)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

exports.login = (req, res) => {
  const mailVar = req.body.mail;
  const passVar = req.body.password;

  user.findOne({ mail: mailVar, password: passVar }, function (err, result) {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while login the User."
      });
    } else {
      if(!result)
        res.send('invalid credentials');
      else  
        res.send(result);
    }
  });
}

// Retrieve all User from the database.
exports.findAll = (req, res) => {
  user.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    });
};

// Find a single User with an id
exports.findOneId = (req, res) => {
  console.log('erererer');
  const idVar = req.params.id;
  console.log('----' + idVar)
  user.findOne({ _id: idVar}, function (err, result) {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting User id= " + idVar
      });
    } else {
      if(!result)
        res.send('No USer matching this Id');
      else
        res.send(result);
    }
  });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  user.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};


// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  user.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`
        });
      } else {
        res.send({
          message: "user was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with id=" + id
      });
    });
};


exports.deleteAll = (req, res) => {
  user.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};