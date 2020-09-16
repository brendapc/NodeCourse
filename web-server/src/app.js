const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()


/*path manipulates the directories, (current, goalDirectory)
express static is a function that receives static files for display
app.use says to express to use that files in root '/'
*/
app.use(express.static(path.join(__dirname, '../public'))) /*even if we're using handlebars for templates, 
the css and client-side js still have to be in the public directory */

//HANDLEBARS:
app.set('view engine', 'hbs') //write exactly that, default search for directory named 'views' 

const viewsPath = path.join(__dirname, '../templates/views') //custom name directory for views
app.set('views', viewsPath)

const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

//ROUTES:
app.get('', (req, res)=>{
    res.render('index', {//render views and pass values
        title: 'OMG a title with handlebars',
        name: 'brenda pereira'
    })
})
app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'about me!',
        info: 'i"m a student',
        name: 'brenda pereira'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help!',
        message: 'sample helpful message',
        name: 'brenda pereira'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404', {
        title: '404',
        name: 'brenda pereira',
        errorMessage: 'help page not found'
    })
})
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }

    forecast(req.query.address, (error, data)=>{
        if(error){
            return res.send({ error})
        }
        res.render('weather', {
            forecast: data,
            address: req.query.address,
            name: 'brenda pereira'
        })
    })

})
app.get('/products',(req, res)=>{

    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })  
})
// * -> anything that hasn't been declared yet
app.get('*',(req, res)=>{ 
    res.render('404', {
        title: '404',
        name: 'brenda pereira',
        errorMessage: ' page not found'
    })
})


app.listen(3000, ()=>{
    console.log('server up on port 3000')
})