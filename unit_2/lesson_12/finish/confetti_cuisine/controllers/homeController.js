"use strict";

var courses = [
  {
    title: "Event Driven Cakes",
    cost: 50
  },
  {
    title: "Asynchronous Artichoke",
    cost: 25
  },
  {
    title: "Object Oriented Orange Juice",
    cost: 10
  }
];

exports.showCourses = (req, res) => {
  res.render("courses", {//courses.ejs
    offeredCourses: courses
  });
};

exports.showSignUp = (req, res) => {
  res.render("contact");//contact.ejs
};

exports.postedSignUpForm = (req, res) => {
  res.render("thanks");//thanks.ejs
};
