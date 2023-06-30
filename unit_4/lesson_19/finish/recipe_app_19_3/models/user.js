"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  Subscriber = require("./subscriber"),
  userSchema = new Schema(
    {
      name: {
        first: {
          type: String,
          trim: true
        },
        last: {
          type: String,
          trim: true
        }
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
      },
      zipCode: {
        type: Number,
        min: [1000, "Zip code too short"],
        max: 99999
      },
      password: {
        type: String,
        required: true
      },
      courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
      subscribedAccount: {
        type: Schema.Types.ObjectId,
        ref: "Subscriber"
      }
    },
    {
      timestamps: true
    }
  );

userSchema.virtual("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`;
});
//Adding a pre(‘save’) hook to user.js: allow you to perform an operation before a database change, such as save, is run.
userSchema.pre("save", function(next) {//next middleware is parameter so when this step is complete, it can call next middleware
  let user = this;//Use the function keyword in the callback.
  if (user.subscribedAccount === undefined) {//check for existing subscriber
    connections.
    Subscriber.findOne({
      email: user.email//Query for a single subscriber.
    })
      .then(subscriber => {
        user.subscribedAccount = subscriber;//Connect the user with a subscriber account.
        next();
      })
      .catch(error => {
        console.log(`Error in connecting subscriber:${error.message}`);
        next(error);//Pass any errors to the next middleware function
      });
  } else {
    next();//Call next function if user already has an association.
  }
});

module.exports = mongoose.model("User", userSchema);
