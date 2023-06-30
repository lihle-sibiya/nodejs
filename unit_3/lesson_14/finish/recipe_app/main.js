"use strict";

const express = require("express"),
  app = express(),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  layouts = require("express-ejs-layouts"),
  //Require Mongoose
  mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber");//Require subcriber: previously exported in subscriber.js
//Set up the connection to ur database
mongoose.connect(
  "mongodb://127.0.0.1:27017/recipe_db",
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);
//Assign the database to the db variable.
const db = mongoose.connection;
//Log a message when the database is connected in main.js
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});
//Page 153: find documents in your database
let myQuery = Subscriber.findOne({
  name: "Jon Wexler"
}).where("email", /wexler/);//finds doc where email has string "wexler"
//Listing 14.6 Run a query with callback function to handle errors and data
myQuery.exec((error, data) => {//data returned by database
  if (data) console.log(data.name);
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

app.get("/name", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
