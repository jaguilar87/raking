module.exports = function (router, ranking) {
  router.get(/\/top\/(\d+)/, function (req, res) {
    let limit = req.matches[1]
    this.send(res, ranking.top(limit))
  })
}
