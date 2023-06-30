"use strict";

const mongoose = require("mongoose"),
//Subscriber schema 
  subscriberSchema = mongoose.Schema({
    name: String,
    email: String,
    zipCode: Number
  });

module.exports = mongoose.model("Subscriber", subscriberSchema);
