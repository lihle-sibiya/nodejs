const express = require('express');

const router = express.Router()

const Model = require('../models/model');

//Post the data
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const dataToSave = await data.save();//saving and storing data
        res.status(200).json(dataToSave)//sucess message with the data
    }
    catch (error) {//error handling
        res.status(400).json({ message: error.message })
    }
})

//Get all the data
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();//Model find method - fetch data from database
        res.json(data)//return data in JSON
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get data by ID 
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


module.exports = router;

