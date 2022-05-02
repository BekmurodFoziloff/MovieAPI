const { Router } = require('express')
const bcrypt = require('bcryptjs') // heshlash moduli
const jwt = require('jsonwebtoken')
const Users = require('../model/User')
const router = Router()

router.post('/register', function (req, res, next) {
  const { username, password } = req.body
  bcrypt.hash(password, 10, (err, hash) => {
    const user = new Users({
      username,
      password: hash
    })
    const promise = user.save()
    promise.then((data) => {
      res.json(data)
    }).catch((err) => {
      console.log(err)
    })
  })
})

router.post('/authenticate', function (req, res, next) {
  const { username, password } = req.body
  Users.findOne({ username }, (err, user) => {
    if (err)
      throw err
    if (!user) {
      res.json({
        status: 'Topilmadi',
        message: 'Muvaffaqiyatsiz amalga oshdi!'
      })
    }
    else {
      bcrypt.compare(password, user.password).then((result) => {
        if (!result)
          res.json({
            status: false,
            status: 'Foydalanuvchi paroli noto\'g\'ri'
          })
        else {
          const payload = {
            username
          }
          const token = jwt.sign(payload, process.env.API_SECRET_KEY, {
            expiresIn: 720 // saytga kirishga 12 soat ruxsat berilgan
          })
          res.json({
            status: true,
            token
          })
        }
      })
    }
  })
})
module.exports = router
