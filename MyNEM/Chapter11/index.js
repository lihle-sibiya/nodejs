const express = require('express')
const expressSession = require('express-session');
const mongoose = require('mongoose')//page 53 - Connecting to MongoDB from Node

mongoose.connect('mongodb://127.0.0.1/my_database', { useNewUrlParser: true })

const app = new express()
const ejs = require('ejs')
app.set('view engine', 'ejs')//tell Express to use EJS 

const fileUpload = require('express-fileupload')
const validateMiddleware = require('./middleware/validateMiddleware');
//const customMiddleware = require('./middleware/customMiddleware')


const newPostController = require('./controllers/newPostController')
const homeController = require('./controllers/homeController')
const storePostController = require('./controllers/storePostController')
const getPostController = require('./controllers/getPostController')
const newUserController = require('./controllers/newUserController')
const storeUserController = require('./controllers/storeUserController')
const loginController = require('./controllers/loginController')
const loginUserController = require('./controllers/loginUserController')

app.use(express.static('public'))

app.use(expressSession({
    secret: 'keyboard cat'
}))

app.use(fileUpload())
//app.use(customMiddleware)
app.use(express.json()) //body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use('/posts/store', validateMiddleware) //to use validation middleware only to create posts



app.get('/', homeController)
app.get('/auth/register', newUserController)
app.get('/auth/login', loginController);

app.get('/posts/new', newPostController)
app.get('/post/:id', getPostController)
app.post('/users/register', storeUserController)
app.post('/users/login', loginUserController)
app.post('/posts/store', storePostController)


app.listen(3000, () => {
    console.log('App listening on port 3000')
})