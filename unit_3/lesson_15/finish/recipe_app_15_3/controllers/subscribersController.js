"use strict";

const Subscriber = require("../models/subscriber");

exports.getAllSubscribers = (req, res) => {
  Subscriber.find({})
    .exec()
    .then(subscribers => {
      res.render("subscribers", {
        subscribers: subscribers
      });
    })
    .catch(error => {
      console.log(error.message);
      return [];
    })
    .then(() => {
      console.log("promise complete");
    });
};

exports.getSubscriptionPage = (req, res) => {
  res.render("contact");
};
//the /subscribe calls this one
exports.saveSubscriber = (req, res) => {

  //maps the form data to the module
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    zipCode: req.body.zipCode
  });
  //a new subscrbriber is created in the module via Mongoose
  newSubscriber.save()
    .then(result => {
      res.render("thanks");// thanks.ejs in views is called
    })
    .catch(error => {
      if (error) res.send(error);
    });
};
