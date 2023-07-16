//page 43 - use EJS
const express = require('express')
const path = require('path')
//page 53 - Connecting to MongoDB from Node
const mongoose = require('mongoose');

const app = new express()
const ejs = require('ejs')
app.set('view engine', 'ejs')//tell Express to use EJS 

mongoose.connect('mongodb://127.0.0.1/my_database', {
    useNewUrlParser:
        true
})



const BlogPost = require('./models/BlogPost.js')

//page 43 routes ejs
app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {//will look for index.ejs in views folder
        blogposts
    });
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

//Page 61: Route to Create New Post
app.get('/posts/new', (req, res) => {
    res.render('create')
})

//Page 65: POST Request for posts/store
app.post('/posts/store', (req, res) => {
    BlogPost.create(req.body) //gets form data
        .then(blogpost => res.redirect('/'))
        .catch(error => console.log(error))
})

app.listen(3000, () => {
    console.log('App listening on port 3000')
})

