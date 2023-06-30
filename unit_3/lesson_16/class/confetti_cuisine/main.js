"use strict";

const express = require("express"),
  app = express(),
  //require controllers
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  subscribersController = require("./controllers/subscribersController"),//require subscribers controller
  layouts = require("express-ejs-layouts");

const mongoose = require("mongoose");//Require the mongoose module
mongoose.connect( //Set up a connection to your local database server
  "mongodb://localhost:27017/confetti_cuisine", //compass URL
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);//server port number
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(layouts);//set app to use layout module
app.use(express.static("public"));//Enabling static files

app.get("/", (req, res) => {//GET route for home page
  res.render("index"); //calls index.ejs
});
//getting all subscribers
app.get("/subscribers", subscribersController.getAllSubscribers);//GET route to view all subscribers
app.get("/contact", subscribersController.getSubscriptionPage);//route to view contact page
app.post("/subscribe", subscribersController.saveSubscriber);//POST route to handle posted data

app.get("/courses", homeController.showCourses);
app.post("/contact", homeController.postedSignUpForm);
//Error handling middleware functions
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {//start live server
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
