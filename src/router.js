var http = require('http')

/**
 * Simple router for HTTP requests.
 * Will only accept GET and POST requests.
 */
class Router {
  /** Constructor */
  constructor() {
    this._headers = {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, POST',
      'access-control-allow-headers': 'content-type',
      'Content-Type': 'application/json'
    }

    this._getActions = []
    this._postActions = []
  }

  /**
   * Use this method as a callback for createServer response:
   * @example
   * var router = new Router()
   * http.createServer(router.handleRequest.bind(router))
   * @param {http.ClientRequest} req Request object
   * @param {http.ServerResponse} res Response object
   */
  handleRequest (req, res) {
    console.log(req.method, req.url)

    if (req.method === 'GET') {
      if (!this._action(req, res, this._getActions)) {
        this._send404(res)
      }
    } else if (req.method === 'POST') {
      // fetch data
      let body = ''
      req.on('data', (data) => {
        body += data

        // Too much (1MB) POST data, kill the connection!
        if (data.length > 1e6) {
          req.connection.destroy()
        }
      })

      req.on('end', () => {
        req.data = JSON.parse(body)
        if (!this._action(req, res, this._postActions)) {
          this._send404(res)
        }
      })
    } else {
      this.send(res, {
        code: 405,
        msg: 'Invalid method ' + req.method
      }, 405)
    }
  }

  /**
   * Travel given actions until one matches.
   *
   * @private
   * @param {http.ClientRequest} req Request object
   * @param {http.ServerResponse} res Response object
   * @param {array} actions Actions to test.
   * An array of objects, ie: { route:/\/(.+)/, action:(req, res) => { this.send(req.matches)} }.
   * @return {boolean} True if matched.
   */
  _action (req, res, actions) {
    return actions.forEach((item) => {
      let matches = item.route.exec(req.url)
      if (matches) {
        req.matches = matches
        item.action.call(this, req, res)
        return true
      }
      return false
    })
  }

  /**
   * Use this function to register GET responses
   * @example
   * router.get('user/:id' (req, res) => { this.send('User: ' + req.params.id) })
   * @param {RegExp} route A regular expression catching the route. First match will be used.
   * To use matches (ie: /[.+]/, access req.matches.
   * @param {function(req, resp)} action Callback function,
   * will receive http.Request and http.Response as arguments.
   * You can use this.send to answer.
   */
  get (route, action) {
    this._getActions.push({ route: route, action: action })
  }

  /**
   * Use this function to register POST responses
   * @example
   * router.get('user/:id' (req, res) => { this.send('User: ' + req.params.id) })
   * @param {RegExp} route A regular expression catching the route. First match will be used.
   * To use matches (ie: /[.+]/), access req.matches.
   * To use post data access req.data.
   * @param {function(req, resp)} action Callback function,
   * will receive http.Request and http.Response as arguments.
   * You can use this.send to answer.
   */
  post (route, action) {
    this._postActions.push({ route: route, action: action })
  }

  /**
   * Send 404 message.
   * @private
   */
  _send404 (res) {
    this.send(res, {
      code: 404,
      msg: 'Route not found'
    }, 404)
  }

  /**
   * Shortcut function to send responses from a router.
   *
   * @param {http.ServerResponse} res Response object
   * @param {string|object} msg Response message.
   * If it is not a string, JSON.stringify will be called.
   * @param {number} [code=200] Response code. 200 by default.
   */
  send (res, msg, code) {
    if (res instanceof http.ServerResponse) {
      res.writeHead(code || 200, this._headers)
      if (typeof msg !== 'string') msg = JSON.stringify(msg)
      res.end(msg)
    } else {
      console.error('ERROR: http.ServerResponse expected as first argument of Router#send.')
      console.error('You have sent:', res)
    }
  }
}

module.exports = Router
