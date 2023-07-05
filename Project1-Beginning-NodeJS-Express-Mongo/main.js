"use strict";

const express = require('express')// require express module
const app = express() // calls express function to start new Express app
const path = require('path')
app.use(express.static('public'))//helps serve static files

const fs = require('fs')//import file system - fs. Helps us interact with files on our server.
//readFileSync method reads the content of each file and returns it.
const homePage = fs.readFileSync('index.html')
const aboutPage = fs.readFileSync('about.html')
const contactPage = fs.readFileSync('contact.html')
const notFoundPage = fs.readFileSync('notfound.html')
const server = http.createServer((req, res) => {
    if (req.url === '/about')//about page
        //res.end now contains the HTML page variable
        res.end(aboutPage)
    else if (req.url === '/contact')//contact page
        res.end(contactPage)
    else if (req.url === '/')//home page
        res.end(homePage)
    else {//if the path does not exist
        res.writeHead(404)//status code of the request
        res.end(notFoundPage)
    }
})



app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))//helps access the full path irregardless of Linux or Windows
})

app.get('/', (req, res) => {
    res.json({//return a JSON respond back to the browser
        name: 'Greg Lim'
    })
})

app.get('/about', (req, res) => { // called when request to /about comes in
    res.sendFile(path.resolve(__dirname, 'about.html'))
})
app.get('/contact', (req, res) => { //called when request to /contact comes
    res.sendFile(path.resolve(__dirname, 'contact.html'))
})

//app.listen(3000, () => {
  //  console.log("App listening on port 3000")
//})

app.listen(4000, () => {
    console.log('App listening on port 4000')
})