const express = require('express')
const path = require('path')
const app = express()

//path manipulates the directories, (current, goalDirectory)
app.use(express.static(path.join(__dirname, '../public')))
//express static is a function that receives static files for display
//app.use says to express to use that files in root '/'


app.listen(3000, ()=>{
    console.log('server up on port 3000')
})