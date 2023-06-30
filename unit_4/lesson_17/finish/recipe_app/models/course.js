"use strict";

const mongoose = require("mongoose");
//course schema
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  items: [],//array of strings to reflect items and ingredients
  zipCode: {//helps users choos courses closer to them
    type: Number,
    min: [10000, "Zip code too short"],
    max: 99999
  }
});

module.exports = mongoose.model("Course", courseSchema);
