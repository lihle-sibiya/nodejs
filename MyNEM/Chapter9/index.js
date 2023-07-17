const express = require('express')
const mongoose = require('mongoose')//page 53 - Connecting to MongoDB from Node

mongoose.connect('mongodb://127.0.0.1/my_database', { useNewUrlParser: true })

const app = new express()
const ejs = require('ejs')
app.set('view engine', 'ejs')//tell Express to use EJS 

const fileUpload = require('express-fileupload')
const validateMiddleware = require('./middleware/validateMiddleware');
const customMiddleware = require('./middleware/customMiddleware')

const newPostController = require('./controllers/newPostController')
const homeController = require('./controllers/homeController')
const storePostController = require('./controllers/storePostController')
const getPostController = require('./controllers/getPostController')

app.use(express.static('public'))
app.use(fileUpload())
app.use(customMiddleware)
app.use(express.json()) //body parsing middleware
app.use(express.urlencoded()) //body parsing middleware

app.use('/posts/store',validateMiddleware) //to use validation middleware only to create posts

app.get('/',homeController)
app.get('/posts/new', newPostController)
app.get('/post/:id',getPostController)
app.post('/posts/store', storePostController)


app.listen(3000, () => {
    console.log('App listening on port 3000')
})