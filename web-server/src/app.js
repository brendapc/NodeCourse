const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('hellow express')
})

app.get('/help', (req, res)=>{
    res.send({
        name: 'brenda',
        age: 17
    })
})

app.listen(3000, ()=>{
    console.log('server up on port 3000')
})