module.exports = function (router, ranking) {
  router.get(/\/at\/(\d+)\/(\d+)/, function (req, res) {
    let pos = req.matches[1]
    let limit = req.matches[2]
    this.send(res, ranking.at(pos, limit))
  })
}
