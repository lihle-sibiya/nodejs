"use strict";

const User = require("../models/user");

module.exports = {
  index: (req, res, next) => {
    User.find()
      .then(users => {
        res.locals.users = users;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("users/index");
  },
  new: (req, res) => {//Add the new action to render a form.
    res.render("users/new");//show the new.ejs in the users forlder
  },

  //Add the create action to save the user to the database.
  create: (req, res, next) => {
    let userParams = {
      name: {
        first: req.body.first,
        last: req.body.last
      },
      email: req.body.email,
      password: req.body.password,
      zipCode: req.body.zipCode
    };
    //C in CRUD
    User.create(userParams)
      .then(user => {
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch(error => {//error handling
        console.log(`Error saving user: ${error.message}`);
        next(error);
      });
  },
  redirectView: (req, res, next) => {//Render the view in a separate redirectView action
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  //The R in CRUD
  show: (req, res, next) => {//add the show action
    let userId = req.params.id;//collect user’s ID from the URL parameters
    User.findById(userId)//Find a user by its ID.
      .then(user => {
        res.locals.user = user;
        next();
      })
      .catch(error => {//if error occurs
        console.log(`Error fetching user by ID: ${error.message}`);//log error message
        next(error);
      });
  },
  showView: (req, res) => {//render the show page and pass the user object to display that user’s information
    res.render("users/show");
  }
};
