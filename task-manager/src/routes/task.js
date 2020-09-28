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
//GET /tasks?completed=true or false
//GET /tasks?skip=20&limit=10 after 20 (2 pages) show me 10 tasks
//GET /tasks?sortBy=createdAt:desc (-1) or asc (1)
router.get('/tasks', auth ,async (req, res)=>{
    const match = {}
    const sort = {}

    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] == 'desc' ? -1 : 1
        console.log(sort)
    }
    try{
        await req.user.populate({
            path: 'tasks',
            match, /* 
                completed: true
            } */
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
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
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch{
        res.status(500).send()
    }
})

module.exports = router

