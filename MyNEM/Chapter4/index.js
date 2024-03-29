//page 43 - use EJS
const express = require('express')
const path = require('path')

const app = new express()
const ejs = require('ejs')

app.set('view engine', 'ejs')//tell Express to use EJS 

app.use(express.static('public'))

//page 43 routes ejs
app.get('/', (req, res) => {
    res.render('index');//will look for index.ejs in views folder
})
//page 44 - GET routes EJS
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})
app.get('/post', (req, res) => {
    res.render('post')
})

app.listen(3000, () => {
    console.log('App listening on port 3000')
})

