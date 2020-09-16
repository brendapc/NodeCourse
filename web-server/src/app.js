const express = require('express')
const path = require('path')
const app = express()

//path manipulates the directories, (current, goalDirectory)
//express static is a function that receives static files for display
//app.use says to express to use that files in root '/'

app.use(express.static(path.join(__dirname, '../public'))) /*even if we're using handlebars for templates, 
the css and client-side js still have to be in the public directory */

//HANDLEBARS:
app.set('view engine', 'hbs') //write exactly that, default search for directory named 'views' 

const viewsPath = path.join(__dirname, '../templates') //custom name directory for views
app.set('views', viewsPath)


app.get('', (req, res)=>{
    res.render('index', {//render views and pass values
        title: 'OMG a title with handlebars',
        name: 'my application'
    })
})
app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'about me!',
        info: 'i"m a student'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help!',
        message: 'sample helpful message'
    })
})

app.listen(3000, ()=>{
    console.log('server up on port 3000')
})