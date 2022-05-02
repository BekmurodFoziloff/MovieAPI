const { Schema, model} = require('mongoose')

const MovieSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    category: String,
    country: String,
    year: Number,
    director_id: Schema.Types.ObjectId,
    imdb_score: Number,
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Movie', MovieSchema)