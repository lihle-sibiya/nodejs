//page 43 - use EJS
const express = require('express')
const path = require('path');
//page 53 - Connecting to MongoDB from Node
const mongoose = require('mongoose')

const app = new express()
const ejs = require('ejs')
app.set('view engine', 'ejs')//tell Express to use EJS 

const fileUpload = require('express-fileupload')
const BlogPost = require('./models/BlogPost.js')

app.use(express.static('public'))
app.use(express.json()) //body parsing middleware
app.use(express.urlencoded()) //body parsing middleware
app.use(fileUpload())

mongoose.connect('mongodb://127.0.0.1/my_database',
    { useNewUrlParser: true })

//page 43 routes ejs
app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {//will look for index.ejs in views folder
        blogposts
    });
})
//page 44 - GET routes EJS
app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/contact', (req, res) => {
    res.render('contact');
})
//Page 61: Route to Create New Post
app.get('/posts/new', (req, res) => {
    res.render('create')
})
//Page 72: Dispaly each blog post in its url
app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
})
//Page 65: POST Request for posts/store
app.post('/posts/store', (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/img', image.name))
        .then(() => BlogPost.create({ ...req.body, image: '/img/' + image.name })) 
        .then(blogpost => res.redirect('/'))
        .catch(error => console.log(error))
})


app.listen(3000, () => {
    console.log('App listening on port 3000')
})



