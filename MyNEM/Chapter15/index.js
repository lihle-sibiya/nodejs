const express = require('express')
const expressSession = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose')//page 53 - Connecting to MongoDB from Node

mongoose.connect('mongodb+srv://Rashid:12345@testcluster1.gzv5rb3.mongodb.net/my_database', { useNewUrlParser: true })

const app = new express()
const ejs = require('ejs')
app.set('view engine', 'ejs')//tell Express to use EJS 

const fileUpload = require('express-fileupload')
const validateMiddleware = require('./middleware/validateMiddleware');
//const customMiddleware = require('./middleware/customMiddleware')
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

const newPostController = require('./controllers/newPostController')
const homeController = require('./controllers/homeController')
const storePostController = require('./controllers/storePostController')
const getPostController = require('./controllers/getPostController')
const newUserController = require('./controllers/newUserController')
const storeUserController = require('./controllers/storeUserController')
const loginController = require('./controllers/loginController')
const loginUserController = require('./controllers/loginUserController')
const logoutController = require('./controllers/logoutController')

app.use(express.static('public'))

app.use(expressSession({
    secret: 'keyboard cat', //used by express-session package to sign and encrypt session ID cookie
    resave: false,
    saveUninitialized: true
}));

app.use(fileUpload())
//app.use(customMiddleware)
app.use(express.json()) //body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use('/posts/store', validateMiddleware) //to use validation middleware only to create posts
app.use(flash());

global.loggedIn = null; //global variable logged in with be accessible in all EJS files

app.use("*", (req, res, next) => {//wildcard: on all requests, this middleware should be executed
    loggedIn = req.session.userId;
    next()
});


app.get('/', homeController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.get('/auth/logout', logoutController)
app.get('/posts/new', authMiddleware, newPostController) //unauthenticated user cannot create post
app.get('/post/:id', getPostController)

app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.post('/posts/store', authMiddleware, storePostController) //call authMiddleware before store post

app.use((req, res) => res.render('notfound'));

app.listen(3000, () => {
    console.log('App listening on port 3000')
})