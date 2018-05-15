module.exports = function (router, ranking) {
  router.get(/\/user\/(\d+)/, function (req, res) {
    let userId = req.matches[1]
    let score = ranking.get(userId)
    if (isNaN(score)) {
      this.send(res, { msg: 'User not found' })
    } else {
      this.send(res, score)
    }
  })

  router.post(/\/user\/(.+)/, function (req, res) {
    let userId = req.matches[1]
    ranking.set(userId, req.data.score)
    this.send(res, { msg: 'Ok' })
  })
}
