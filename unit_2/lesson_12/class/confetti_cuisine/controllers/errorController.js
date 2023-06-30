"use strict";

const httpStatus = require("http-status-codes");

exports.pageNotFoundError = (req, res) => {//handles all requests not previously handled
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.render("error");// error.ejs
};

exports.internalServerError = (error, req, res, next) => {//handles any internal server errors that occur
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occurred: ${error.stack}`);
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is taking a nap!`);//friendly message instead of crashing
};
