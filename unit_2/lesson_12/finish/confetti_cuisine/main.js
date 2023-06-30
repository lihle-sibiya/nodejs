"use strict";

const express = require("express"),
  app = express(),

  homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
  //Require the expressejs-layouts module
  layouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
//Tell the Express.js app to use body-parser for processing URLencoded and JSON parameters
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
//Set the application to use the layout module.
app.use(layouts);
//Enabling static files - use the epxress static function
app.use(express.static("public"));
//create route for home page
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);
//Add error handlers as middleware
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);
//start live server
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
