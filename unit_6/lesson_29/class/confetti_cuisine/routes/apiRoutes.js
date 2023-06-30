"use strict";

const router = require("express").Router(),
  coursesController = require("../controllers/coursesController");

router.get(//router handles GET requests 
  "/courses", //made in the courses path
  coursesController.index, // this routes ets the courses from the index action in coursesController
  coursesController.filterUserCourses,//marks courses the user has
  coursesController.respondJSON//results are sent back to respondJSON function
);
router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON);//GET route to join a course by id
router.use(coursesController.errorJSON);//handles errors from any of the routes in this API

module.exports = router;//export router
