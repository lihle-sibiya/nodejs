"use strict";

const User = require("../models/user");

module.exports = {
  index: (req, res, next) => {
    User.find()//Mongoose command to fins all users according to the model description
      .then(users => {
        res.locals.users = users;//store user data
        next();//call the next middleware function
      })
      .catch(error => {//error handling
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },
  //returning the users array to the view
  indexView: (req, res) => {
    res.render("users/index");
  }
};
