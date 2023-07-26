const express = require('express');

const router = express.Router()

const Model = require('../model/model');

// //Post Method
// router.post('/post', (req, res) => {
//     res.send('Post API')
// })

//Post Method
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const dataToSave = await  data.save();//saving and storing data
        res.status(200).json(dataToSave)//sucess message with the data
    }
    catch (error) {//error handling
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
router.get('/getAll', (req, res) => {
    res.send('Get All API')
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send(req.params.id)
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})



module.exports = router;

