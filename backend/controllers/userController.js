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
      res.status(500).send(errors)
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