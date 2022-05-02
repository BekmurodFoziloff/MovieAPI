const { Schema, model } = require('mongoose')

const DirectorSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    },
    bio: String,
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Director', DirectorSchema)