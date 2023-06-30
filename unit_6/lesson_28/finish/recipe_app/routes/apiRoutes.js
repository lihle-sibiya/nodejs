"use strict";

const router = require("express").Router(),
  coursesController = require("../controllers/coursesController"),
  usersController = require("../controllers/usersController");//require users contorller

// router.use(usersController.verifyToken);
router.post("/login", usersController.apiAuthenticate);//POST route
router.use(usersController.verifyJWT);//add this token so that it runs before every API request is handled
router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON);
router.get(
  "/courses",
  coursesController.index,
  coursesController.filterUserCourses,
  coursesController.respondJSON
);
router.use(coursesController.errorJSON);

module.exports = router;
