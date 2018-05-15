/**
 * This class will store ranking system in memory.
 */
class Ranking {
  /**
   * Empty constructor
   */
  constructor() {
    this.data = {}
    this._sortedData = []
    this._unsorted = false
  }

  /**
   * Use this function to fill the data with 10000 users with random score.
   */
  seed () {
    console.log('Seeding ranking...')
    this._unsorted = true
    for (let i = 0; i < 10000; i++) {
      this.data[i] = Math.floor((Math.random() * 99999))
    }
  }

  /**
   * Sets a user score. If score starts with + or -, score will be added or removed.
   * @param {number} userId User unique id.
   * @param {string|number} score Score to set.
   */
  set (userId, score) {
    if (score || score === 0) {
      this._unsorted = true
      if (score[0] === '+' || score[0] === '-') {
        this.data[userId] += parseInt(score)
      } else {
        this.data[userId] = score
      }
    }
  }

  /**
   * Returns said user score.
   * @param {number} userId User unique id.
   */
  get (userId) {
    return this.data[userId]
  }

  /**
   * Returns given top X scores.
   * @param {number} limit How many results to show.
   */
  top (limit) {
    if (this._unsorted) this._sortData()
    return this._sortedData.slice(0, limit)
  }

  /**
   * Returns relative top for given position and limit.
   * @example
   * at(100, 3) will give you from 97th to 103rd.
   * @param {number} position Position to show.
   * @param {number} limit Range of scores shown.
   */
  at (position, limit) {
    if (this._unsorted) this._sortData()
    position = parseInt(position)
    limit = parseInt(limit)
    return this._sortedData.slice(position - limit - 1, position + limit)
  }

  /**
   * Returns sorted data.
   */
  _sortData () {
    this._sortedData = []
    for (var user in this.data) {
      this._sortedData.push({ userId: user, score: this.data[user] })
    }

    this._sortedData.sort(function (a, b) { return b.score - a.score })
    this._unsorted = false
  }
}

module.exports = Ranking
