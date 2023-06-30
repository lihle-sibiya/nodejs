"use strict";

const port = 3000,
  express = require("express"),
  app = express();

app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
});

app.get("/items/:vegetable", (req, res) => {//Add a route to get URL parameters
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);//response sends item from URL
});//put an if statement or switch statement for 2 cases for tomato

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
