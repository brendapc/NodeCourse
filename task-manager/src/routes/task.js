const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.post('/task', async (req, res) => {
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    } catch(err){
        res.status(400).send(err)
    } 
})
router.get('/task', async (req, res)=>{
    
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    }catch(err){
        res.status(500).send(err) 
    }
})
router.get('/task/:id', async (req, res)=>{
    const _id = req.params.id

    try{
        const task = await Task.findById(_id)
        res.send(task)
    }catch(err){
        res.status(500).send(err)
    }
})
router.patch('/task/:id', async(req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidUpdate = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidUpdate){
        return res.status(400).send({ error: 'invalid update'})
    }

    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true,  runValidators: true})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(err){
        res.status(400).send(err)
    }
})
router.delete('/task/:id', async(req, res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch{
        res.status(500).send()
    }
})

module.exports = router

