"use strict";

const express = require("express"),
  app = express(),
  errorController = require("./controllers/errorController"),//error handling
  homeController = require("./controllers/homeController"),
  layouts = require("express-ejs-layouts");//Require the express.js-layouts module

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");//set app to use ejs

app.use(express.static("public"));//Enabling static files - use the epxress static function
app.use(layouts);//Set the application to use the layout module.

app.use(//Tell the Express.js app to use body-parser for processing URLencoded and JSON parameters
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

//creates routes
app.get("/name", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/", (req, res) => {//route for home page
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

//add middleware functions for error handling
app.use(errorController.logErrors);//Tell Express.js to use errorController.js middleware function
app.use(errorController.respondNoResourceFound);//catches requests made with no matching routes
app.use(errorController.respondInternalError);//catches any requests where errors occurs

app.listen(app.get("port"), () => {//start live server
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
