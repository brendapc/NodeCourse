const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1>27017/task-manager-api',{
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true //retira espaços 
    },
    email: {
        type: String,
        trim: true,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('Email is invalid')
            }
        }
    },
    age: {
        default: 18,
        type: Number,
        validate(value){
            if(value<=0){
                throw new Error('age must be a positive number')
            }
        }
    }
})

const me = new User({
    name: '  tobby  ',
    age: 22,
    email: '   eu@mail.com  '
})

me.save().then((me)=>{
    console.log('usuário salvo '+ me)
}).catch((err)=>{
    console.log(err)
})

/* const Tasks = mongoose.model('Task',{
    title: String,
    done: Boolean
})

const chore = new Tasks({
    title: 'aguar as plantas',
    done: false
})

chore.save().then((chore)=>{
    console.log('chore registed ' + chore)
}) */