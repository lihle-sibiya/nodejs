const express = require("express")
const mongo = require("mongodb").MongoClient;

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/tripcost', { useNewUrlParser: true })
const url = "mongodb://127.0.0.1/tripcost";
const app = express()

//use the express.json() middleware
app.use(express.json())

//connect to the database using connect():
let db, trips, expenses

mongo.connect(
    'mongodb://127.0.0.1',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, client) => {
        if (err) {
            console.error(err)
            return
        }
        db = client.db("tripcost")
        trips = db.collection("trips") //get a reference to the trips collections
        expenses = db.collection("expenses") //get a reference to the expenses collections
    }
)

//add the stubs for the API endpoints
app.post("/trip", (req, res) => {//a way for client to add trip using the POST /trip endpoint
    const name = req.body.name  //access the data by referencing it from Request.body
    trips.insertOne({ name: name }, (err, result) =>  //se the trips.insertOne() method to add the trip to the database:
    {
        if (err) { //error handling
            console.error(err)
            res.status(500).json({ err: err })//status 500 if error is present
            return
        }
        console.log(result)
        res.status(200).json({ ok: true })//200 successful response to client, JSON response
    })
})


//list of trips - has no parameters
app.get("/trips", (req, res) => {
    trips.find().toArray((err, items) => //trips.find() method to convert to an array using toArray()
    {
        if (err) { //error handling
            console.error(err)
            res.status(500).json({ err: err })
            return
        }
        res.status(200).json({ trips: items })
    })
})

// Add a new expense
//POST /expense { trip, date, amount, category, description }
app.post("/expense", (req, res) => {
    expenses.insertOne( //insertOne() method to add a trip
        {//5 parameters from the request body
            trip: req.body.trip,
            date: req.body.date,
            amount: req.body.amount,
            category: req.body.category,
            description: req.body.description,
        },
        (err, result) => {
            if (err) {
                console.error(err)
                res.status(500).json({ err: err })
                return
            }
            res.status(200).json({ ok: true })
        }
    )
})

//List all expenses
app.get("/expenses", (req, res) => {
    expenses.find({ trip: req.body.trip }).toArray((err, items) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        }
        res.status(200).json({ expenses: items })
    })
})

//Add an expense
const tripsData = {
    "trips": [
        {
            "_id": "64c14d8b4924cc7a8564cf47",
            "name": "Yellowstone 2018"
        },
        {
            "_id": "64c14d494924cc7a8564cf46",
            "name": "Sweden 2017"
        },
        {
            "_id": "64c14c714924cc7a8564cf45",
            "name": "First trip"
        }
    ]
}


app.listen(3000, () => console.log("Server ready"))