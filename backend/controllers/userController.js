const User = require("../models/User")

exports.signUp = function(req, res) {
  let user = new User(req.body)
  user.signUp()
  console.log("Received user:")
  console.log(user)
}