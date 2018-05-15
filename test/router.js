let chai = require('chai')
let expect = chai.expect

describe('Router', () => {
  let Router = require('../src/router')

  it('#send() should not fail if no response is sent', () => {
    let router = new Router()
    router.send('not-a-response')
  })

})
