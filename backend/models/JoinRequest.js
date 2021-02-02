const ObjectID = require('mongodb').ObjectID

const teamsCollection = require("../db").collection("teams")
const joinRequestsCollection = require("../db").collection("join-requests")

let JoinRequest = function(teamId, jwtUser) {
  this.data = {
    teamId: teamId,
    requestor: jwtUser._id
  }
  this.errors = []
}

JoinRequest.prototype.validate = async function() {
  if (!this.data.teamId) {
    this.errors.push("TeamId is mandatory.")
  }
  if (!this.data.requestor) {
    this.errors.push("RequestorId is mandatory.")
  }

  const team = await teamsCollection.findOne({_id: new ObjectID(this.data.teamId)})
  if (!team) {
    this.errors.push("Given team is invalid.")
  }
}

JoinRequest.prototype.create = async function() {
  await this.validate()

  if (!this.errors.length) {
    await joinRequestsCollection.insertOne(this.data)
    return true
  }

  return false
}

JoinRequest.findJoinRequest = async function(teamId, userId) {
  const joinRequest = await joinRequestsCollection.findOne({requestor: userId, teamId: teamId})
  return joinRequest
}

module.exports = JoinRequest