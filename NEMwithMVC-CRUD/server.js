const express = require('express');const app = express();


//READ - R in CRUD
app.get('/', (req, res) => {  
    res.sendFile(__dirname + '/index.html')
})  // Note: __dirname is the path to your current working directory. Try logging it and see what you get!   // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.


//CREATE - C in CRUD
app.post('/quotes', (req, res) => {  
    console.log('Hellooooooooooooooooo!')
})






app.listen(3000, function() {  console.log('listening on 3000')})