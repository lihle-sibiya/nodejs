"use strict";

const User = require("../models/user"),
  passport = require("passport"),//not for API user but for normal users
  jsonWebToken = require("jsonwebtoken"),//for API users
  getUserParams = body => {
    return {
      name: {
        first: body.first,
        last: body.last
      },
      email: body.email,
      password: body.password,
      zipCode: body.zipCode
    };
  };

module.exports = {
  index: (req, res, next) => {
    User.find()
      .then(users => {
        res.locals.users = users;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("users/index");
  },
  new: (req, res) => {
    res.render("users/new");
  },
  create: (req, res, next) => {
    if (req.skip) next();
    let newUser = new User(getUserParams(req.body));
    User.register(newUser, req.body.password, (error, user) => {
      if (user) {
        req.flash("success", `${user.fullName}'s account created successfully!`);
        res.locals.redirect = "/users";
        next();
      } else {
        req.flash("error", `Failed to create user account because: ${error.message}.`);
        res.locals.redirect = "/users/new";
        next();
      }
    });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },
  showView: (req, res) => {
    res.render("users/show");
  },
  edit: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.render("users/edit", {
          user: user
        });
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },
  update: (req, res, next) => {
    let userId = req.params.id,
      userParams = {
        name: {
          first: req.body.first,
          last: req.body.last
        },
        email: req.body.email,
        password: req.body.password,
        zipCode: req.body.zipCode
      };
    User.findByIdAndUpdate(userId, {
      $set: userParams
    })
      .then(user => {
        res.locals.redirect = `/users/${userId}`;
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error updating user by ID: ${error.message}`);
        next(error);
      });
  },
  delete: (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndRemove(userId)
      .then(() => {
        res.locals.redirect = "/users";
        next();
      })
      .catch(error => {
        console.log(`Error deleting user by ID: ${error.message}`);
        next();
      });
  },
  login: (req, res) => {
    res.render("users/login");
  },
  authenticate: passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: "Failed to login.",
    successRedirect: "/",
    successFlash: "Logged in!"
  }),
  validate: (req, res, next) => {
    req
      .sanitizeBody("email")
      .normalizeEmail({
        all_lowercase: true
      })
      .trim();
    req.check("email", "Email is invalid").isEmail();
    req
      .check("zipCode", "Zip code is invalid")
      .notEmpty()
      .isInt()
      .isLength({
        min: 5,
        max: 5
      })
      .equals(req.body.zipCode);
    req.check("password", "Password cannot be empty").notEmpty();

    req.getValidationResult().then(error => {
      if (!error.isEmpty()) {
        let messages = error.array().map(e => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = "/users/new";
        next();
      } else {
        next();
      }
    });
  },
  logout: (req, res, next) => {
    req.logout();
    req.flash("success", "You have been logged out!");
    res.locals.redirect = "/";
    next();
  },
  // verifyToken: (req, res, next) => {//Create the verifyToken middleware function with the next parametre
  //   let token = req.query.apiToken;  //checks for a query param called apiToken that matches the token I set earlier.
  //   if (token) {//If the tokens match
  //     User.findOne({ apiToken: token })
  //       .then(user => {
  //         if (user) next();//call the next middleware if tokens match
  //         else next(new Error("Invalid API token."));
  //       })
  //       .catch(error => {
  //         next(new Error(error.message));//otherwise, pass an error  with a custom error message
  //       });
  //   } else {
  //     next(new Error("Invalid API token."));//error message if tokens dont match
  //   }
  // },

  //Listing 28.4 Creating a login action for the API
  apiAuthenticate: (req, res, next) => {//Authenticate with the passport authenticate method
    passport.authenticate("local", (errors, user) => {
      if (user) {//if a user exists...
        let signedToken = jsonWebToken.sign(//...Sign the JWT with matching email and password
          {
            data: user._id,//create a token with user's id
            exp: new Date().setDate(new Date().getDate() + 1)//expiration date set to one day 
          },
          "secret_encoding_passphrase"
        );
        res.json({//respond with  JASON object..
          success: true, //..success tag...
          token: signedToken //...and the sgned token
        });
      } else
        res.json({
          success: false,
          message: "Could not authenticate user."//respond with error message
        });
    })(req, res, next);
  },
  //Listing 28.6 Creating a verification action for the API
  //secure all the API endpoints, add an action to verify incoming JWTs
  verifyJWT: (req, res, next) => {
    let token = req.headers.token;//pull the incoming token from the request header
    if (token) {//if the token exists...
      jsonWebToken.verify(token, "secret_encoding_passphrase", (errors, payload) => {//...use json-WebToken.verify along with the token
        // and secret passphrase to decode the token and verify its authenticity.
        if (payload) {//check if payload has a value
          User.findById(payload.data).then(user => {//If so, pull the user’s ID from payload.data
            //and query the database for a user with that ID
            if (user) {
              next();//if a user is found with t JWT ID ...call the next middleware
            } else {//if no user exist..
              res.status(httpStatus.FORBIDDEN).json({
                error: true,//...return error message
                message: "No User account found."
              });
            }
          });
        } else {
          res.status(httpStatus.UNAUTHORIZED).json({
            error: true,
            message: "Cannot verify API token."//error message if token cannot be verified
          });
          next();
        }
      });
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({
        error: true,
        message: "Provide Token"//error message in no token is foudn in the request headers
      });
    }
  }
};
