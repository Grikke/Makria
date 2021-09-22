var remoteList = { }
var authKey = { }

setInterval(() => {
  remoteList = {}
}, 1000)

/**
 * Get a Random String by Math Random method
 * @returns {String} str - Random String
 */
const randString = () => {
  let str = ''
  for (let i = 0; i < 3; i++) {
    str += Math.random().toString(36).split('').splice(2, 10).join('')
  }
  return str
}

const Makria = {
  /**
   * Recover the stored value in the key
   * @param {String} key 
   * @return {*|false} value
   */
  authValue: key => {
    if (authKey[key] != null)
      return authKey[key]
    return false
  },
  /**
   * Remove the stored value in the key
   * @param {String} key 
   * @return {Boolean}
   */
  removeAuthValue: key => {
    if (authKey[key] != null) {
      delete authKey[key]
      return true
    }
    return false
  },
  /**
   * Generate a random key for specified value, store it to retrieve the value
   * @param {*} value 
   * @return {String} key
   */
  generateKey: value => {
    let rand = randString()
    while (Makria.authValue(rand)) {
      rand = randString()
    }
    authKey = {...authKey, [rand]: value}
    return rand
  },
  /**
   * Check if the address didn't already request, Callback to use as a Middleware for Express
   * @param {object} req
   * @param {object} res
   * @param {function} next
   */
  checkIP: (req, res, next) => {
    let ip = req.socket.remoteAddress || req.connection.socket.remoteAddress
    if (remoteList[ip] == null) {
      remoteList = {...remoteList, [ip]: ''}
      next()
    }
    else {
      res.status(429).send({
        state: false, 
        message: 'Too much request for one path, please wait one second'
      })
    }
  }
}

module.exports = Makria