"use strict";

//this router module handles routes

//Using require to import modules
const httpStatus = require("http-status-codes"),
    contentTypes = require("./contentTypes"),
    utils = require("./utils");

//Created routes object to holds key-value pairs
const routes = {
    GET: {}, //GET requests through: get function
    POST: {} //POST requests through: post function
};

//handle function: callback function to createServer in main.js
exports.handle = (req, res) => {//handle requests
    try {
        routes[req.method][req.url](req, res);
    } catch (e) {
        res.writeHead(httpStatus.OK, contentTypes.html);
        utils.getFile("views/error.html", res);//getFile function in utils module to respond with an error page
    }
};
//get and post functions take a URL and callback function 
exports.get = (url, action) => {
    routes["GET"][url] = action; //then map them to each other in routes object
};

exports.post = (url, action) => {
    routes["POST"][url] = action;
};
