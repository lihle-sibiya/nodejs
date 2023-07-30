const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')

app.set('view engine', 'ejs')
mongoose.connect('mongodb://127.0.0.1/star-wars-quotes', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });

app.use(bodyParser.urlencoded({ extended: true }))


const quoteSchema = new mongoose.Schema({
    name: String,
    quote: String
});

// Create a Mongoose model based on the 'quoteSchema'
const quote = mongoose.model('quote', quoteSchema);


//READ - R in CRUD
app.get('/', async (req, res) => {
    try {
        const quotes = await quote.find({}).exec();
        res.render('index.ejs', { quotes });
    } catch (err) {
        console.error('Error retrieving quotes:', err);
        res.status(500).json({ error: 'Error retrieving quotes from the database' });
    }
});

//CREATE - C in CRUD
app.post('/quotes', (req, res) => {
    const newQuote = new quote({ quote: req.body.quote, name: req.body.name });
    newQuote.save()
        .then(() => {
            console.log('Quote saved to database');
            res.redirect('/');
        })
        .catch((err) => {
            console.error('Error saving quote:', err);
        });
});

app.listen(3000, function () { console.log('listening on 3000') })