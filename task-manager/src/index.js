const express = require('express')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

/* app.use((req, res, next)=>{
    if(req.method === 'GET'){
        res.send('get request are disabled')
    }else{
        next()
    }
}) */

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port, ()=>{
    console.log('port is on at '+ port)
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async ()=>{
    const user = await User.findById('5f7070f0eadad32d58246db6')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()