const express = require('express')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.use(userRouter)
app.use(taskRouter)

app.use(express.json())

app.listen(port, ()=>{
    console.log('port is on at '+ port)
})

