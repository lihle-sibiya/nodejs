"use strict";

const router = require("express").Router(),//Require the Express.js router
  coursesController = require("../controllers/coursesController");//require courses controller

  //Adding a router to show all courses
router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON);//adding API route to the Express.JS router
router.get(
  "/courses",//only courses ae subjected to the API
  coursesController.index,
  coursesController.filterUserCourses,
  coursesController.respondJSON
);
router.use(coursesController.errorJSON);//error-handling middleware in case actions run earlier don’t return a response

module.exports = router;//export the router
