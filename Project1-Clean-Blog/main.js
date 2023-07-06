"use strict";

const express = require('express')// require express module
const path = require('path')//helps get the specific path to the file

const app = new express() // calls express function to start new Express app
app.use(express.static('public'))//helps serve static files



app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'))//helps access the full path irregardless of Linux or Windows
})

app.get('/about', (req, res) => { // called when request to /about comes in
    res.sendFile(path.resolve(__dirname, 'pages/about.html'))
})

app.get('/contact', (req, res) => { //called when request to /contact comes
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
})

app.get('/post', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'))
})


app.listen(3000, () => {//start live server
    console.log('App listening on port 3000')
})