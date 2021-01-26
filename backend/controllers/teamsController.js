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

exports.getTeamMembershipInfo = async function(req, res) {
  const status = await Team.getTeamMembershipInfo(req.params.id, req.jwtUser)

  if (!status) {
    res.status(500).send()
  }
  if (status.error) {
    res.status(404).send()
  }

  res.status(200).send(status)
}