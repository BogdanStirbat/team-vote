const ObjectID = require('mongodb').ObjectID

const teamsCollection = require("../db").collection("teams")
const joinRequestsCollection = require("../db").collection("join-requests")
const membershipCollection = require("../db").collection("team-membership")
const notificationsCollection = require("../db").collection("notifications")

let JoinRequest = function(teamId, jwtUser) {
  this.data = {
    teamId: teamId,
    requestor: jwtUser._id
  }
  this.jwtUser = jwtUser
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
    const team = await teamsCollection.findOne({_id: new ObjectID(this.data.teamId)})
    const notification = {
      type: "join_request",
      to: team.admin,
      from: this.jwtUser._id,
      teamId: this.data.teamId,
      text: `User ${this.jwtUser.username} (${this.jwtUser.email}) wants to join team ${team.name}.`,
      seen: false
    }

    await notificationsCollection.insertOne(notification)
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

  const notification = {
    type: "join_request_approved",
    to: joinRequest.requestor,
    from: team.admin,
    teamId: joinRequest.teamId,
    text: `Your request to join the team ${team.name} has been approved.`,
    seen: false
  }

  await notificationsCollection.insertOne(notification)

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

  const notification = {
    type: "join_request_declined",
    to: joinRequest.requestor,
    from: team.admin,
    teamId: joinRequest.teamId,
    text: `Your request to join the team ${team.name} has been declined.`,
    seen: false
  }

  await notificationsCollection.insertOne(notification)


  const result = await joinRequestsCollection.deleteOne({_id: new ObjectID(joinRequestId)})
  return result.deletedCount == 1? true: false
}

JoinRequest.joinRequestsForTem = async function(teamId, jwtUser) {
  const team = await teamsCollection.findOne({_id: new ObjectID(teamId)})
  if (!team) {
    return false
  }

  if (team.admin != jwtUser._id) {
    return false
  }

  const joinRequests = await joinRequestsCollection.find({teamId: teamId}).toArray()
  return joinRequests
}

module.exports = JoinRequest