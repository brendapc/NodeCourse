const express = require('express')
const User = require('./models/user')
const Task = require('./models/task')


require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res)=>{
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    }catch(err){
        res.status(400).send(err)
    }
    /* user.save().then(()=>{
        res.status(201).send(user)
    }).catch((err)=>{
        res.status(400).send(err)
        console.log(err)
    }) */
})

app.post('/task', async (req, res) => {
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    } catch(err){
        res.status(400).send(err)
    }
    
   
})

app.get('/users', async (req, res)=>{

    try{
        const users = await User.find({})
        res.send(users)
    }catch(err){
        res.status(505).send(err)
    }
    /* User.find({ }).then((users)=>{
        res.send(users)
    }).catch((err)=>{
        res.status(400).send()
    }) */
})

app.get('/users/:id', async (req, res)=>{
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

    /* User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    
    }).catch((err)=>{
        res.status(500).send()
        console.log(err)
    }) */
})
app.get('/task', async (req, res)=>{
    
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    }catch(err){
        res.status(500).send(err) 
    }
})

app.get('/task/:id', async (req, res)=>{
    const _id = req.params.id

    try{
        const task = await Task.findById(_id)
        res.send(task)
    }catch(err){
        res.status(500).send(err)
    }

})

app.patch('/users/:id', async(req, res)=>{
    const _id =  req.params.id
    const updates = Object.keys(req.body)
    const allowesUpdates = ['name', 'email', 'password', 'age']
    const isValidUpdate = updates.every((update) => allowesUpdates.includes(update)) //every retorna true se tudo retornar true

    if(!isValidUpdate){
        return res.status(400).send({ error: 'this update is not allowed'})
    }

    try{
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true})

        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(err){
        res.status(400).send(err)
    }
})
app.patch('/task/:id', async(req, res)=>{
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

app.delete("/users/:id", async(req, res)=>{
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
app.delete('/task/:id', async(req, res)=>{
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
app.listen(port, ()=>{
    console.log('port is on at '+ port)
})

