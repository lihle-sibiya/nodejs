"use strict";

const port = 3000,
  express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController");

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());//parse URL-encoded data

app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
});

app.post("/", (req, res) => {//creates new POS route for home page
  console.log(req.body);//incoming equest body
  console.log(req.query);//query string: collect stored values in URL path
  res.send("POST Successful!");
});

app.get("/items/:vegetable", homeController.sendReqParam);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
