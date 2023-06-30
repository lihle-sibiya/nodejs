"use strict";

//The index.js module requires all route modules to be in one place.
const router = require("express").Router(),//require the Express.js Router
  userRoutes = require("./userRoutes"),
  subscriberRoutes = require("./subscriberRoutes"),
  courseRoutes = require("./courseRoutes"),
  errorRoutes = require("./errorRoutes"),
  homeRoutes = require("./homeRoutes");

  //tell the local router object to use those routes with specific namespaces
router.use("/users", userRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/courses", courseRoutes);
//For the home and error routes, no namespace is necessary
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;//export the router
