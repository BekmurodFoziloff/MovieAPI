const chai = require('chai')
const chaiHttp = require('chai-http')

const should = chai.should()
const server = require('../app')

chai.use(chaiHttp)

describe('/api/movies sahifani testdan o\'tkazish', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({ username: 'Karim', password: '1234567' })
            .end(async (err, res) => {
                token = await res.body.token
                console.log(token)
                done()
            })
    })

    describe('/GET movies', () => {
        it('GET methodi orqali movieslarni tekshirish', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    done()
                })
        })
    })

    // POST orqali yangi ma'lumot kiritish testi
    describe('/POST movies', () => {
        it('POST methodi orqali yangi movieslarni tekshirish', (done) => {
            const movie = {
                title: 'Avatar',
                category: 'Fantastika',
                country: "USA",
                year: 2009,
                director_id: '61e2cafb96b6a55ccab1273f',
                imdb_score: 9.5
            }

            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('title')
                    res.body.should.have.property('category')
                    res.body.should.have.property('country')
                    res.body.should.have.property('year')
                    res.body.should.have.property('director_id')
                    res.body.should.have.property('imdb_score')
                    movieID = res.body._id
                    done()
                })
        })
    })

    // GET orqali yangi ma'lumot kiritish testi
    describe('/GET movies', () => {
        it('GET methodida  id orqali olishni tekshirish', (done) => {
            chai.request(server)
                .get(`/api/movies/${movieID}`)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('title')
                    res.body.should.have.property('category')
                    res.body.should.have.property('country')
                    res.body.should.have.property('year')
                    res.body.should.have.property('director_id')
                    res.body.should.have.property('imdb_score')
                    res.body.should.have.property('_id').eql(movieID)
                    done()
                })
        })
    })

    describe('/PUT/movie_id movie', () => {
        it('should PUT a movie', (done) => {
            const movie = {
                title: 'TEST',
                directory_id: '5ec3e85c140bbd2d56cfeb0b',
                category: 'War',
                country: 'USA',
                year: 1999,
                imdb_score: 8.3
            }
            chai.request(server)
                .put('/api/movies/' + movieId)
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('title').eql(movie.title)
                    res.body.should.have.property('directory_id').eql(movie.directory_id)
                    res.body.should.have.property('category').eql(movie.category)
                    res.body.should.have.property('country').eql(movie.country)
                    res.body.should.have.property('year').eql(movie.year)
                    res.body.should.have.property('imdb_score').eql(movie.imdb_score)
                    done()
                })
        })
    })

    describe('/DELETE/movie_id movie', () => {
        it('should DELETE movie by id', (done) => {
            chai.request(server)
                .delete('/api/movies/' + movieId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('status').eql(1)
                    done()
                })
        })
    })
})
