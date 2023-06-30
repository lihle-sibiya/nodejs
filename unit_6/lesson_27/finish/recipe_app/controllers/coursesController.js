"use strict";

const Course = require("../models/course"),
  httpStatus = require("http-status-codes"),
  User = require("../models/user");//require user model

module.exports = {
  index: (req, res, next) => {//index action
    Course.find({})
      .then(courses => {
        res.locals.courses = courses;//index action attaches courses to the response’s locals object
        next();
      })
      .catch(error => {
        console.log(`Error fetching courses: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("courses/index");
  },
  new: (req, res) => {
    res.render("courses/new");
  },

  create: (req, res, next) => {
    let courseParams = {
      title: req.body.title,
      description: req.body.description,
      items: [req.body.items.split(",")],
      zipCode: req.body.zipCode
    };
    Course.create(courseParams)
      .then(course => {
        res.locals.redirect = "/courses";
        res.locals.course = course;
        next();
      })
      .catch(error => {
        console.log(`Error saving course: ${error.message}`);
        next(error);
      });
  },

  show: (req, res, next) => {
    let courseId = req.params.id;
    Course.findById(courseId)
      .then(course => {
        res.locals.course = course;
        next();
      })
      .catch(error => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("courses/show");
  },

  edit: (req, res, next) => {
    let courseId = req.params.id;
    Course.findById(courseId)
      .then(course => {
        res.render("courses/edit", {
          course: course
        });
      })
      .catch(error => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let courseId = req.params.id,
      courseParams = {
        title: req.body.title,
        description: req.body.description,
        items: [req.body.items.split(",")],
        zipCode: req.body.zipCode
      };

    Course.findByIdAndUpdate(courseId, {
      $set: courseParams
    })
      .then(course => {
        res.locals.redirect = `/courses/${courseId}`;
        res.locals.course = course;
        next();
      })
      .catch(error => {
        console.log(`Error updating course by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let courseId = req.params.id;
    Course.findByIdAndRemove(courseId)
      .then(() => {
        res.locals.redirect = "/courses";
        next();
      })
      .catch(error => {
        console.log(`Error deleting course by ID: ${error.message}`);
        next();
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },
  respondJSON: (req, res) => {//Handle the request from previous middleware, and submit response.
    res.json({
      status: httpStatus.OK,
      data: res.locals//Respond with the response’s local data in JSON format.
    });
  },
  errorJSON: (error, req, res, next) => {//Respond with a 500 status code and error message in JSON format.
    let errorObject;
    if (error) {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,//internal error occured instead of directing it another page
        message: error.message
      };
    } else {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Unknown Error."
      };
    }
    res.json(errorObject);
  },
  join: (req, res, next) => {//Add the join action to let users join a course
    let courseId = req.params.id,//Get the course id 
      currentUser = req.user;//get current user from the request
    if (currentUser) {//check whetehr a current user is logged in
      User.findByIdAndUpdate(currentUser, {
        $addToSet: {
          courses: courseId//Update the user’s courses field to contain the targeted course.
        }
      })
        .then(() => {
          res.locals.success = true;//Respond with a JSON object with a success indicator
          next();
        })
        .catch(error => {
          next(error);
        });
    } else {
      next(new Error("User must log in."));//Pass an error through to the next middleware function.
    }
  },
  filterUserCourses: (req, res, next) => {//filter your results
    let currentUser = res.locals.currentUser;//check if user is logged in - if it's a current user
    if (currentUser) {//if user is logged in
      let mappedCourses = res.locals.courses.map(course => {//map function on ur array of courses. 
        let userJoined = currentUser.courses.some(userCourse => {//The some function returns a Boolean value to let you know if a match occurs
          return userCourse.equals(course._id);//check each course if its id is found is the user's array of courses
        });//Object.assign - convert the courses Mongoose document object to JSON
        return Object.assign(course.toObject(), { joined: userJoined });//if joined: userJoined value for that course is true
      });
      res.locals.courses = mappedCourses;
      next();//if no user is logged, call next to pass along the unmodified course results
    } else {
      next();
    }
  }
};
