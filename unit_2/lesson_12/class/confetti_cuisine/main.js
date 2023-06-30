"use strict";

const express = require("express"),
    app = express(),

    homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),//error handling
    
    layouts = require("express-ejs-layouts");//Require the express.js-layouts module

app.set("view engine", "ejs")//set app to use ejs
app.set("port", process.env.PORT || 3000);

app.use(//Tell the Express.js app to use body-parser for processing URLencoded and JSON parameters
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
app.use(layouts);//Set the application to use the layout module.
app.use(express.static("public"));//Enabling static files - use the epxress static function

//create Routes
app.get("/", (req, res) => {//route for home page
    res.render("index");//render the index page in place of sending plain text
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