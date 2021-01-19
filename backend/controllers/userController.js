const jwt = require("jsonwebtoken")

const User = require("../models/User")

const tokenDuration = "30d"

exports.signUp = function(req, res) {
  let user = new User(req.body)
  user
    .signUp()
    .then(() => {
      res.json({
        token: jwt.sign({_id: user.data._id, username: user.data.username, email: user.data.email}, process.env.JWTSECRET, {expiresIn: tokenDuration}),
        username: user.data.username,
        email: user.data.email
      })
    })
    .catch(errors => {
      res.status(400).send(errors)
    })
}

exports.login = function(req, res) {
  let user = new User(req.body)
  user
    .login()
    .then(result => {
      res.json({
        token: jwt.sign({_id: user.data._id, username: user.data.username, email: user.data.email}, process.env.JWTSECRET, {expiresIn: tokenDuration}),
        username: user.data.username,
        email: user.data.email
      })
    })
    .catch(errors => {
      res.json(false)
    })
}

exports.checkJwtToken = function(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    res.status(401).send("Invalid token.")
    return
  }
  jwt.verify(token, process.env.JWTSECRET, (err, user) => {
    if (err) {
      console.log(err)
      res.status(401).send("Invalid token.")
      return
    }
    req.jwtUser = user
    next()
  })
}