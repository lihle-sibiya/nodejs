const express = require("express")
const mongoose = require('mongoose')
const expense = require('./models/expense');
const trip = require('./models/trip');
const url = "mongodb://127.0.0.1:27017/tripcost";

const app = express()
app.use(express.json())

// Connect to MongoDB using Mongoose
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

// Route to add a new trip to the database
app.post("/trip", async (req, res) => {
    try {
        const name = req.body.name;
        const newTrip = new Trip({ name: name });// Create a new Trip document using the Mongoose model
        await newTrip.save();// Save the new trip to the database
        res.status(200).json({ message: "Trip added successfully", trip: newTrip });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add trip" });
    }
});

// Route to get a list of all trips from the database
app.get("/trips", async (req, res) => {
    try {
        const trips = await Trip.find();
        res.status(200).json({ trips: trips });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch trips" });
    }
});

// Add a new expense
app.post("/expense", async (req, res) => {
    try {
        const { trip, date, amount, category, description } = req.body;
        const newExpense = new expense({ trip, date, amount, category, description });
        await newExpense.save();
        res.status(200).json({ ok: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error adding the expense" });
    }
});

// Route to get expenses for a specific trip
app.get("/expenses", async (req, res) => {
    try {
        const tripId = req.body.trip; // Use req.body to access the tripId from the request body
        if (!tripId) {
            res.status(400).json({ error: "Missing trip ID in the request body" });
            return;
        }
        // Assuming 'expenses' is a Mongoose model
        const expensesForTrip = await expense.find({ trip: tripId }).exec();
        res.status(200).json({ expenses: expensesForTrip });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});

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