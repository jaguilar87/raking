const Ranking = require('./ranking')
const Router = require('./router')
const http = require('http')

/**
 * Server class to manage connections and responses.
 */
class Server {
  /**
   * Starts the server
   * @param {number} port Port to listen
   */
  start (port) {
    // Ranking
    this.ranking = new Ranking()
    this.ranking.seed() // Use this to fill the ranking with ranom values.

    // Define routes
    this.router = new Router()
    require('./endpoint/user')(this.router, this.ranking)
    require('./endpoint/top')(this.router, this.ranking)
    require('./endpoint/at')(this.router, this.ranking)

    // Create server
    this._server = http.createServer(this.router.handleRequest.bind(this.router))
    this._server.listen(port)

    console.log('Server listening at ' + port)
  }
}

module.exports = Server
