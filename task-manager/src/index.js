const express = require('express')
const User = require('./models/user')
const Task = require('./models/task')

require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res)=>{
    const user = new User(req.body)

    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((err)=>{
        res.status(400).send(err)
        console.log(err)
    })
})

app.post('/task',(req, res) => {
    const task = new Task(req.body)

    task.save().then(()=>{
        res.status(201).send(task)
    }).catch((err)=>{
        res.status(400).send(err)
        console.log(err)
    })
})

app.get('/users', (req, res)=>{
    User.find({ }).then((users)=>{
        res.send(users)
    }).catch((err)=>{
        res.status(400).send()
    })
})

app.get('/users/:id', (req, res)=>{
    const _id = req.params.id
    console.log(req.params.id)

    User.findById(_id).then((user)=>{

        if(!user){
            return res.status(404).send()
        }
        
        res.send(user)
    
    }).catch((err)=>{
        res.status(500).send()
        console.log(err)
    })
})




app.listen(port, ()=>{
    console.log('port is on at '+ port)
})

