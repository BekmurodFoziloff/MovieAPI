const { Router } = require('express')
const router = Router()
const Movies = require('../model/Movie')

// POST Create a new movie
router.post('/', (req, res) => {
  // const data = req.body
  // res.json(data)

  // const { title, category, country, year, imdb_score } = req.body
  // const movie = new Movies({
  //   title: title,
  //   category: category,
  //   country: country,
  //   year: year,
  //   imdb_score: imdb_score
  // })

  const movie = new Movies(req.body) // qisqartirish usuli

  const promise = movie.save()
  promise.then((data) => {
    res.json(data)
  }).catch((err) => {
    console.log(err)
  })
})

// GET List all movies
router.get('/', (req, res) => {
  const promise = Movies.find({})
  promise.then(data => {
    res.json(data)
  }).catch(err => {
    console.log(err)
  })
})

// GET Get a movie
router.get('/:movie_id', (req, res) => {
  const promise = Movies.findById(req.params.movie_id)
  promise.then(data => {
    res.json(data)
  }).catch(err => {
    console.log(err)
  })
})

// PUT Update a movie with new info
router.put('/:movie_id', (req, res) => {
  const promise = Movies.findByIdAndUpdate(req.params.movie_id, req.body)
  promise.then(data => {
    res.json(data)
  }).catch(err => {
    console.log(err)
  })
})

// DELETE
router.delete('/:movie_id', (req, res) => {
  const promise = Movies.findByIdAndRemove(req.params.movie_id)
  promise.then(data => {
    res.json(data)
  }).catch(err => {
    console.log(err)
  })
})

// GET Get the top 10 movies
router.get('/top/top10', (req, res) => {
  const promise = Movies.find({}).limit(10).sort({ imdb_score: -1 })
  promise.then(data => {
    res.json(data)
  }).catch(err => {
    console.log(err)
  })
})

// GET Movies between two dates
router.get('/between/:start_year/:end_year', (req, res) => {
  const { start_year, end_year } = req.params
  const promise = Movies.find({
    year: { "$gte": parseInt(start_year), "$lte": parseInt(end_year) }
  })
  promise.then(data => {
    res.json(data)
  }).catch(err => {
    console.log(err)
  })
})

module.exports = router