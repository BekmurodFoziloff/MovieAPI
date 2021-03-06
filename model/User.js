const { Schema, model} = require('mongoose')

const UserSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 5
    }
})

module.exports = model('User',UserSchema)