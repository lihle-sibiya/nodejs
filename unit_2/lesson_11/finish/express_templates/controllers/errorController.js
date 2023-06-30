"use strict";

const httpStatus = require("http-status-codes");

//accept four arguments in this error handler so they are intrepreted as error handling middleware
//not as normal middleware function
exports.logErrors = (error, req, res, next) => {//If an error occurs in the request-response cycle, it appears as the first argument
    //next argument calls the next function or route in the chain,
  console.error(error.stack);//console.error to log the error object’s stack property: tells you error
  next(error);//Pass the error to the next middleware function.
};

exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND;//respond with a 404 status code if page not found
  res.status(errorCode);
  res.send(`${errorCode} | The page does not exist!`);
};

exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;//respond with 500 status if app got an error in the process.
  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};
