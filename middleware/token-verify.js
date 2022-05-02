const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token
    if (token) {
        jwt.verify(token, process.env.API_SECRET_KEY, (err, decoded) => {
            if (err) {
                res.json({
                    status: false,
                    message: 'Token noto\'g\'ri! Kirolmaysiz!'
                })
            }
            else {
                req.decoded = decoded
                next()
            }
        })
    }
    else {
        res.json({
            status: false,
            message: 'Token topilmadi!'
        })
    }
}