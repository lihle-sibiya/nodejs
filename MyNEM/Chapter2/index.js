//Page 27

const express = require('express') // require express module
const app = express() // calls express function to start new Express app
const path = require('path')
app.use(express.static('public'))
app.listen(3000, () => {
    console.log("App listening on port 3000")
})

//Page 28
// app.get('/', (req, res) => {
//     res.json({
//         name: 'Greg Lim'
//     })
// })

//page 30
app.get('/about',(req,res)=>{ // called when request to /about comes in
    res.sendFile(path.resolve(__dirname,'about.html'))
    })

    //page 30
    app.get('/contact',(req,res)=>{ //called when request to /contact comes
        res.sendFile(path.resolve(__dirname,'contact.html'))
    })

//page 29
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
})