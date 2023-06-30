"use strict";

const Subscriber = require("../models/subscriber");//require subscriber model

exports.getAllSubscribers = (req, res) => {//retrieve all subscribers
  Subscriber.find({})//finds subscribers
    .exec()
    .then(subscribers => {
      res.render("subscribers", {//calls subscribers.ejs
        subscribers: subscribers
      });
    })
    .catch(error => {//error handling
      console.log(error.message);
      return [];
    })
    .then(() => {//promise resolved
      console.log("promise complete");//outputs on console
    });
};

exports.getSubscriptionPage = (req, res) => {
  res.render("contact");//calls contact.ejs
};

exports.saveSubscriber = (req, res) => {//saves subscribers
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    zipCode: req.body.zipCode
  });
  newSubscriber//saves subscribers
    .save()
    .then(() => {
      res.render("thanks");//calls thanks.ejs
    })
    .catch(error => {//error handling
      res.send(error);
    });
};
