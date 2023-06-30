const mongoose = require("mongoose"),//Require Mongoose
  Subscriber = require("./models/subscriber"),//Assign the Subscriber model to a variable using the model name and local project file.
  Course = require("./models/course");//Require the Course model.

var testCourse, testSubscriber;///Set up two variables outside the promise chain.

mongoose.connect(//set up a database connection
  "mongodb://localhost:27017/recipe_db",
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;//Tell Mongoose to use native promises

Subscriber.remove({})
  .then(items => console.log(`Removed ${items.n} records!`))
  .then(() => {
    return Course.remove({});
  })
  .then(items => console.log(`Removed ${items.n} records!`))
  .then(() => {
    return Subscriber.create({//Create a new subscriber document
      name: "Jon",
      email: "jon@jonwexler.com",
      zipCode: "12345"
    });
  })
  .then(subscriber => {
    console.log(`Created Subscriber: ${subscriber.getInfo()}`);
  })
  .then(() => {
    return Subscriber.findOne({//search for the document you just created
      name: "Jon"
    });
  })
  .then(subscriber => {
    testSubscriber = subscriber;
    console.log(`Found one subscriber: ${subscriber.getInfo()}`);//Log the subscriber record
  })
  .then(() => {
    return Course.create({//Create a new course instance.
      title: "Tomato Land",
      description: "Locally farmed tomatoes only",
      zipCode: 12345,
      items: ["cherry", "heirloom"]
    });
  })
  .then(course => {
    testCourse = course;
    console.log(`Created course: ${course.title}`);
  })
  .then(() => {
    testSubscriber.courses.push(testCourse);//Push the testCourse course into the courses array of testSubscriber.ASOOCIATE course with subscriber
    testSubscriber.save();//Save the model instance again.
  })
  .then(() => {
    return Subscriber.populate(testSubscriber, "courses");//Use populate 
  })
  .then(subscriber => console.log(subscriber))
  .then(() => {
    return Subscriber.find({//Find a subscriber
      courses: mongoose.Types.ObjectId(testCourse._id)
    });
  })
  .then(subscriber => console.log(subscriber));
