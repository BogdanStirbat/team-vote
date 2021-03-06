const validator = require("validator")
const ObjectID = require('mongodb').ObjectID

const teamsCollection = require("../db").collection("teams")
const membershipCollection = require("../db").collection("team-membership")
const usersCollection = require('../db').collection('users')

let Team = function(data, jwtUser) {
  this.data = data
  this.jwtUser = jwtUser
  this.errors = []
}

Team.prototype.cleanup = function() {
  if (typeof(this.data.name) != "string") {
    this.data.name = ""
  }

  this.data = {
    name: this.data.name,
    admin: this.jwtUser._id
  }
}

Team.prototype.validate = async function() {
  if (this.data.name == "") {
    this.errors.push("Name is not provided.")
  }
  if (this.data.name != "" && !validator.isAlphanumeric(this.data.name)) {
    this.errors.push("Name must contain only letters and numbers.")
  }

  let teamWithSameName = await teamsCollection.findOne({name: this.data.name})
  if (teamWithSameName) {
    this.errors.push("A team with the same name already exists.")
  }
}

Team.prototype.create = function() {
  return new Promise(async (resolve, reject) => {
    this.cleanup()
    await this.validate()

    if (!this.errors.length) {
      await teamsCollection.insertOne(this.data)
      resolve()
    } else {
      reject(this.errors)
    }
  })
}

Team.getLoggedInUserTeams = async function(jwtUser) {
  let adminTeams = await teamsCollection.find({admin: jwtUser._id}).toArray()

  let memberships = await membershipCollection.find({memberId: jwtUser._id}).toArray()

  let memberTeams = await Promise.all(memberships.map(async (member) => {
    let team = await teamsCollection.findOne({_id: new ObjectID(member.teamId)})
    return team
  }))

  return adminTeams.concat(memberTeams)
}

Team.getTeamMembershipInfo = async function(teamId, jwtUser) {
  let objectId
  try {
    objectId = new ObjectID(teamId)
  } catch (e) {
    return {
      error: true
    }
  }

  const team = await teamsCollection.findOne({_id: new ObjectID(teamId)})

  if (!team) {
    return {
      error: true
    }
  }

  let membershipStatus = "none"
  if (team.admin == jwtUser._id) {
    membershipStatus = "admin"
  }

  if (membershipStatus == "none") {
    const memberTeam = await membershipCollection.findOne({teamId: teamId, memberId: jwtUser._id})
    if (memberTeam) {
      membershipStatus = "member"
    }
  }

  return {
    team: team,
    membershipStatus: membershipStatus
  }
}

Team.getTeamMembers = async function(teamId, jwtUser) {
  const membership = await membershipCollection.find({teamId: teamId}).toArray()
  
  const members = await Promise.all(membership.map(async (membership) => {
    const user = await usersCollection.findOne({_id: new ObjectID(membership.memberId)})
    const member = {
      _id: user._id,
      username: user.username,
      email: user.email
    }
    return member
  }))

  return members
}

Team.searchTeams = async function(q) {
  let teams = await teamsCollection.find({name: q}).toArray()
  return teams
}

module.exports = Team