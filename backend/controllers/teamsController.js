const Team = require("../models/Team")

exports.create = function(req, res) {
  let team = new Team(req.body, req.jwtUser)
  team
    .create()
    .then(result => {
      res.json({name: team.data.name})
    })
    .catch(errors => {
      res.status(400).send(errors)
    })
}