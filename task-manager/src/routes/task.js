const express = require('express')
const Task = require('../models/task')
const auth = require('../middlewares/auth')
const router = new express.Router()

router.post('/task', auth ,async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try{
        await task.save()
        res.status(201).send(task)
    } catch(err){
        res.status(400).send(err)
    } 
})

router.get('/tasks', auth ,async (req, res)=>{
    match = {}
    
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    
    try{
        await req.user.populate({
            path: 'tasks',
            match /* 
                completed: true
            } */
        }).execPopulate()
        
        res.send(req.user.tasks)
    }catch(err){
        res.status(500).send(err) 
    }

})

router.get('/task/:id', auth ,async (req, res)=>{
    const _id = req.params.id

    try{
        const task = await Task.findOne({ _id, owner: req.user._id})

        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    }catch(err){
        res.status(500).send(err)
    }
})
router.patch('/task/:id', auth, async(req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidUpdate = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidUpdate){
        return res.status(400).send({ error: 'invalid update'})
    }

    try{
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(err){
        res.status(400).send(err)
    }
})
router.delete('/task/:id', auth ,async(req, res)=>{
    try{
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch{
        res.status(500).send()
    }
})

module.exports = router

