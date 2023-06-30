"use strict";

let courses = [
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
];//Define an array of courses.

//add callback functions for specific routes
exports.showCourses = (req, res) => {
    res.render("courses", {//courses.ejs
        offeredCourses: courses//pass the courses object to the view and refer to it as offeredCourses
    });
};

exports.showSignUp = (req, res) => {
    res.render("contact");//contact.ejs
};

exports.postedSignUpForm = (req, res) => {
    res.render("thanks");//thanks.ejs
};
