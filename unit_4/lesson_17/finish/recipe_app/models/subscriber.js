"use strict";

//Listing 17.1 Defining a subscriber schema
const mongoose = require("mongoose");
const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,//schema type aka data type
    required: true //Require the name property.
  },
  email: {
    type: String,
    required: true, //Require the email property
    lowercase: true, //lowercase property: not case sensitive
    unique: true//not a validator: Mongoose schema helper.
  },
  zipCode: {
    type: Number,
    min: [10000, "Zip code too short"],//Set up the zipCode property with a custom error message.
    max: 99999//range for zip code
  },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]//reference course property
});
//Listing 17.3 Adding instance methods to the schema in subscriber.js
//Add an instance method to get full name of a subscriber
subscriberSchema.methods.getInfo = function() {
  return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
};
//Add an instance method to find array of subscribers with the same ZIP code.
subscriberSchema.methods.findLocalSubscribers = function() {
  return this.model("Subscriber")
    .find({ zipCode: this.zipCode })//Access the Subscriber model to use the find method.
    .exec();//ensures u get a promise back instead of adding callback
};

module.exports = mongoose.model("Subscriber", subscriberSchema);
