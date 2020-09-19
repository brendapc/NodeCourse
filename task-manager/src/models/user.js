const mongoose = require('mongoose')
const validator = require('validator')


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
    },
    password: {
        required: true,
        type: String,
        minlength: 6,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error ("the password cant contain the word passoword")
            }
        }
    }
})

module.exports = User