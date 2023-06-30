"use strict";

const router = require("express").Router(),//Require Express.js router
  usersController = require("../controllers/usersController");//Require usrs controller.

router.get("/", usersController.index, usersController.indexView);//Add CRUD routes.
router.get("/new", usersController.new);
router.post(
  "/create",
  usersController.validate,
  usersController.create,
  usersController.redirectView
);
router.get("/login", usersController.login);//Add login and route
router.post("/login", usersController.authenticate);//Add authenticate route
router.get("/logout", usersController.logout, usersController.redirectView);
router.get("/:id/edit", usersController.edit);
router.put("/:id/update", usersController.update, usersController.redirectView);
router.get("/:id", usersController.show, usersController.showView);
router.delete("/:id/delete", usersController.delete, usersController.redirectView);

module.exports = router;//Export the module router
