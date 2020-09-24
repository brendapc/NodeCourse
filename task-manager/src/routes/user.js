const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users', async (req, res)=>{
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    }catch(err){
        res.status(400).send(err)
    }
})

router.post('/users/login', async (req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch(err){
        res.status(400).send()
    }
})

router.get('/users', async (req, res)=>{

    try{
        const users = await User.find({})
        res.send(users)
    }catch(err){
        res.status(505).send(err)
    }
   
})
router.get('/users/:id', async (req, res)=>{
    const _id = req.params.id

    try{

        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch(err){
        res.status(500).send(err)
    }
})
router.patch('/users/:id', async(req, res)=>{
    const _id =  req.params.id
    const updates = Object.keys(req.body)
    const allowesUpdates = ['name', 'email', 'password', 'age']
    const isValidUpdate = updates.every((update) => allowesUpdates.includes(update)) //every retorna true se tudo retornar true

    if(!isValidUpdate){
        return res.status(400).send({ error: 'this update is not allowed'})
    }

    try{
        const user = await User.findById(req.params.id)

        updates.forEach((update)=> user[update] = req.body[update])

        await user.save()

        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(err){
        res.status(400).send(err)
    }
})
router.delete("/users/:id", async(req, res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(err){
        res.status(500).send()
    }
})
module.exports = router