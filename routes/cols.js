const express = require('express');
const router = express.Router();
const Col = require('../models/Col');

//get all
router.get('/', async (req, res) => {
    try {
        const cols = await Col.find();
        res.json({cols});
    } catch (err) {
        res.json({ message: err });
    }
});

//get spesific
router.get('/:colId', async (req, res) => {
    try {
        const col = await Col.findById(req.params.colId);
        res.json(col);
    } catch (error) {
        res.json({message: err});
    }
});

//submits a col
router.post('/', async (req,res) => {
    const col = new Col({
        title: req.body.title,
        imgurl: req.body.imgurl,
        texts: req.body.texts
    });
    try{
    const savedCol = await col.save();
    res.json(savedCol);
    }catch(err){
        res.json({message: err});
    }
});

//deletes a col
router.delete('/:colId', async (req, res) => {
    try {
        const removedCol = await Col.deleteOne({_id: req.params.colId});
        res.json(removedCol);
    } catch (err) {
        res.json({message: err});
    }
});

//update a col
router.patch('/texts/:colId', async (req, res) => {
    try {
        const updatedCol = await Col.updateOne(
            { _id: req.params.colId }, 
            { $set: { 
                texts: req.body.texts
            }});
        res.json(updatedCol);
    } catch (error) {
        console.log(error);
    }
});
router.patch('/title/:colId', async (req, res) => {
    try {
        const updatedCol = await Col.updateOne(
            { _id: req.params.colId }, 
            { $set: { 
                title: req.body.title
            }});
        res.json(updatedCol);
    } catch (error) {
        console.log(error);
    }
});
module.exports = router;