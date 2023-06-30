"use strict";

const mongoose = require("mongoose"),
  subscriberSchema = mongoose.Schema({//Subscriber schema
    name: String,
    email: String,
    zipCode: Number
  });//schema properties

module.exports = mongoose.model("Subscriber", subscriberSchema);//exports the model
