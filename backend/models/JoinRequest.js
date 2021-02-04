const ObjectID = require('mongodb').ObjectID

const teamsCollection = require("../db").collection("teams")
const joinRequestsCollection = require("../db").collection("join-requests")
const membershipCollection = require("../db").collection("team-membership")

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

JoinRequest.retrieveTeam = async function(joinRequestId) {
  const joinRequest = await joinRequestsCollection.findOne({_id: new ObjectID(joinRequestId)})
  if (!joinRequest) {
    return false
  }

  const team = await teamsCollection.findOne({_id: new ObjectID(joinRequest.teamId)})
  return team
}

JoinRequest.approveJoinRequest = async function(joinRequestId, userId) {
  const joinRequest = await joinRequestsCollection.findOne({_id: new ObjectID(joinRequestId)})
  if (!joinRequest) {
    return false
  }

  const team = await teamsCollection.findOne({_id: new ObjectID(joinRequest.teamId)})
  if (!team) {
    return false
  }

  if (team.admin != userId) {
    return false
  }

  const result = await membershipCollection.insertOne({
    teamId: joinRequest.teamId,
    memberId: joinRequest.requestor
  })

  if (result.insertedCount == 0) {
    return false
  }

  const deleteResult = await joinRequestsCollection.deleteOne({_id: new ObjectID(joinRequestId)})
  return deleteResult.deletedCount == 1? true: false
}

JoinRequest.deleteJoinRequest = async function(joinRequestId, userId) {
  const joinRequest = await joinRequestsCollection.findOne({_id: new ObjectID(joinRequestId)})
  if (!joinRequest) {
    return false
  }

  const team = await teamsCollection.findOne({_id: new ObjectID(joinRequest.teamId)})
  if (!team) {
    return false
  }
  if (team.admin != userId) {
    return false
  }

  const result = await joinRequestsCollection.deleteOne({_id: new ObjectID(joinRequestId)})
  return result.deletedCount == 1? true: false
}

module.exports = JoinRequest