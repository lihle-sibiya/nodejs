const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    trip: { type: mongoose.Schema.Types.ObjectId, ref: 'trip', required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
});

const expense = mongoose.model('expense', expenseSchema);

module.exports = expense;

