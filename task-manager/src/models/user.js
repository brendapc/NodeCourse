const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true //retira espaços 
    },
    email: {
        type: String,
        trim: true,
        unique: true,
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
        type: String,
        minlength: 6,
        trim: true,
        required: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error ("the password cant contain the word passoword")
            }
        }
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({_id: this._id.toString()}, 'thisisatoken')

    this.tokens = this.tokens.concat({ token })
    await this.save()
    return token
}

userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email }) //"email": email

    if(!user){
        throw new Error("unable to login")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error("unable to login")
    }

    return user

}

//hash password
userSchema.pre('save', async function(next){
    console.log('just before saving')

    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User