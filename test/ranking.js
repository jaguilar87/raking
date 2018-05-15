let chai = require('chai')
let expect = chai.expect

describe('Ranking', () => {
  let Ranking = require('../src/ranking')

  it('#get()', () => {
    let ranking = new Ranking()
    ranking.set(1, 2)
    expect(ranking.get(1)).to.equal(2)
  })

  it('#set()', () => {
    let ranking = new Ranking()
    ranking.set(1, 2)
    expect(ranking.get(1)).to.equal(2)
    ranking.set(1, '+1')
    expect(ranking.get(1)).to.equal(3)
    ranking.set(1, '-2')
    expect(ranking.get(1)).to.equal(1)
  })

  it('#seed()', () => {
    let ranking = new Ranking()
    ranking.seed()
    expect(ranking.get(1)).to.be.a('number')
  })

  it('#top()', () => {
    let ranking = new Ranking()
    ranking.set(1, 2)

    let top = ranking.top(100)
    expect(top.length).to.equal(1)
    expect(top[0].userId).to.equal('1')
    expect(top[0].score).to.equal(2)
    ranking.set(2, 100)

    top = ranking.top(100)
    expect(top.length).to.equal(2)
    expect(top[0].userId).to.equal('2')
    expect(top[0].score).to.equal(100)
  })

  it('#at()', () => {
    let ranking = new Ranking()
    ranking.set(1, 20)
    ranking.set(2, 30)
    ranking.set(3, 40)
    ranking.set(4, 50)

    let top = ranking.at(3, 1)
    expect(top.length).to.equal(3)
    expect(top[0].userId).to.equal('3')
    expect(top[0].score).to.equal(40)
  })
})
