const Server = require('./server')

console.log('Initializing Ranking Server...')

// Init server
let server = new Server()
server.start(8080)

module.exports = server
