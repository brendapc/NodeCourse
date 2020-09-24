const express = require('express')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

app.use(userRouter)
app.use(taskRouter)



app.listen(port, ()=>{
    console.log('port is on at '+ port)
})

const jwt = require('jsonwebtoken')

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123'}, 'thisismeusingjsonwt', {expiresIn: '1 second'})
    console.log(token)

    const data = jwt.verify(token, 'thisismeusingjsonwt')
    console.log(data)
}

myFunction()