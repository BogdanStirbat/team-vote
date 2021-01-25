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

exports.getLoggedInUserTeams = async function(req, res) {
  let teams = await Team.getLoggedInUserTeams(req.jwtUser)
  res.status(200).send(teams)
}