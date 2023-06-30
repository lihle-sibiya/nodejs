const port = 3000,
    express = require("express"),//Add express module
    app = express(); //store express to app variable
app.get("/", (req, res) => {//set up a GET route for the home page
    res.send("Hello, Universe!");//issue response from server to client
})
    .listen(port, () => {//Start live server
        console.log(`The Express.js server has started and is listening
➥ on port number: ${port}`);
    });