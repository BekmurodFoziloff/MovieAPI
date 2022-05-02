const mongoose = require('mongoose')
require('dotenv').config()

module.exports = () => {
    mongoose.connect(process.env.MONGO_URL)
    const db = mongoose.connection
    db.on('open', () => {
        console.log('MongoDBga online bog\'landik!')
    })
    db.on('error', () => {
        console.log('MongoDBda qayerdadir xatolik bor!')
    })
}