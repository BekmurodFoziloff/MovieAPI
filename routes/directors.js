const { Router } = require('express')
const router = Router()
const mongoose = require('mongoose')
const Directors = require('../model/Director')

// POST Create a new movie
router.post('/', function (req, res) {
    const director = new Directors(req.body)
    const promise = director.save()
    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        console.log(err)
    })
})

// GET List all directors
router.get('/', function (req, res) {
    const promise = Directors.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'Movies'
            }
        },
        {
            $unwind: {
                path: '$Movies' // faqat movies borlarini ko'rsatadi
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$Movies'
                }
            }
        },
        // {
        //     $project: {
        //         _id: '$_id._id',
        //         name: '$_id.name',
        //         surname: '$_id.surname',
        //         bio: '$_id.bio',
        //         movies: '$Movies'
        //     }
        // }
    ])
    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        console.log(err)
    })
})

// GET Get a director
router.get('/:director_id', function (req, res, next) {
    const promise = Directors.aggregate([
        {
            $match: {
                '_id': mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'Movies'
            }
        },
        {
            $unwind: {
                path: '$Movies' // faqat movies borlarini ko'rsatadi
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$Movies'
                }
            }
        },
        // {
        //     $project: {
        //         _id: '$_id._id',
        //         name: '$_id.name',
        //         surname: '$_id.surname',
        //         bio: '$_id.bio',
        //         movies: '$Movies'
        //     }
        // }
    ])
    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        console.log(err)
    })
})

router.put('/:director_id', function (req, res, next) {
    const promise = Directors.findByIdAndUpdate(req.params.director_id, req.body, {
        new: true
    })
    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        console.log(err)
    })
})

router.delete('/:director_id', function (req, res, next) {
    const promise = Directors.findByIdAndRemove(req.params.director_id)
    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        console.log(err)
    })
})

router.get('/:director_id/best10movie', function (req, res, next) {
    const promise = Directors.aggregate([
        {
            $match: {
                '_id': mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'Movies'
            }
        },
        {
            $unwind: {
                path: '$Movies' // faqat movies borlarini ko'rsatadi
            }
        },
        {
            $sort: {
                'Movies.imdb_score': -1
            }
        },
        {
            $limit: 10
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$Movies'
                }
            }
        },
        // {
        //     $project: {
        //         _id: '$_id._id',
        //         movies: '$Movies'
        //     }
        // }
    ])
    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        console.log(err)
    })
})

module.exports = router
