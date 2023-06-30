"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  userSchema = new Schema(//create user schema
    {
      name: {//name object: Add first and lastname properties
        first: {
          type: String,
          trim: true//no whitespaces
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
      password: {//stores user password as string
        type: String,
        required: true //required b4 account created
      },
      courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],//add courses propery to connect users to courses
      subscribedAccount: {//connect users to subscribers
        type: Schema.Types.ObjectId,
        ref: "Subscriber"
      }
    },
    {
      timestamps: true//Records createdAt and updatedAt dates
    }
  );

userSchema.virtual("fullName").get(function() {//Adding a virtual attribute
  return `${this.name.first} ${this.name.last}`;
});
module.exports = mongoose.model("User", userSchema);
