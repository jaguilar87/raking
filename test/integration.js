const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const server = require('../src')
var url = 'http://localhost:8080'

describe('Should not accept PUT and DELETE', () => {
  it('deny PUT', (done) => {
    chai.request(url)
      .put('/')
      .end(function (err, res) {
        chai.expect(err).to.be
        chai.expect(res).to.have.status(405)
        done()
      })
  })

  it('deny DELETE', (done) => {
    chai.request(url)
      .delete('/')
      .end(function (err, res) {
        chai.expect(err).to.be
        chai.expect(res).to.have.status(405)
        done()
      })
  })
})

describe('/user/:id', () => {
  it('it should GET score for given user', (done) => {
    chai.request(url)
      .get('/user/1')
      .end(function (err, res) {
        chai.expect(err).to.be.null
        chai.expect(res).to.have.status(200)
        chai.expect(res.body).to.be.a('number')
        done()
      })
  })

  it('it should POST to add score', (done) => {
    let value = server.ranking.get(2)
    chai.request(url)
      .post('/user/2')
      .send({ score: '+20' })
      .end(function (err, res) {
        chai.expect(value + 20).to.equal(server.ranking.get(2))
        done()
      })
  })

  it('it should POST to set score', (done) => {
    chai.request(url)
      .post('/user/3')
      .send({ score: 200 })
      .end(function (err, res) {
        chai.expect(200).to.equal(server.ranking.get(3))
        done()
      })
  })

  it('it should POST to remove score', (done) => {
    let value = server.ranking.get(4)
    chai.request(url)
      .post('/user/4')
      .send({ score: '-20' })
      .end(function (err, res) {
        chai.expect(value - 20).to.equal(server.ranking.get(4))
        done()
      })
  })

  it('it should error if user does not exist', (done) => {
    chai.request(url)
      .get('/user/999999')
      .end(function (err, res) {
        chai.expect(err).to.be.null
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.msg).to.be.a('string')
        done()
      })
  })
})

describe('/top/:limit', () => {
  it('should GET top 100', (done) => {
    chai.request(url)
      .get('/top/100')
      .end(function (err, res) {
        chai.expect(err).to.be.null
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.length).to.equal(100)
        chai.expect(res.body[0].score >= res.body[1].score).to.equal(true)
        done()
      })
  })
})

describe('/at/pos/:limit', () => {
  it('should GET from 25 to 35 ', (done) => {
    chai.request(url)
      .get('/at/30/5')
      .end(function (err, res) {
        chai.expect(err).to.be.null
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.length).to.equal(11)
        chai.expect(res.body[0].score >= res.body[1].score).to.equal(true)
        done()
      })
  })
})
