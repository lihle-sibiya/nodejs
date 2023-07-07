//page 36
// const express = require('express')
// const app = new express()
// app.listen(3000, () => {
//     console.log('App listening on port 3000')
// })

//page 37 - static files
// const express = require('express')
// const app = new express()
// app.use(express.static('public'))//static files

// app.listen(3000, ()=>{
// console.log('App listening on port 3000')
// })


//page 40 - creating page routes
const express = require('express')
const path = require('path')

const app = new express()
app.use(express.static('public'))//static files

//page routes
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'))
})

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'))
})
app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
})
app.get('/post', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'))
})


app.listen(3000, () => {
    console.log('App listening on port 3000')
})

