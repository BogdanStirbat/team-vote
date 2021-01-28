const ObjectID = require('mongodb').ObjectID

const notificationsCollection = require("../db").collection("notifications")
const teamsCollection = require("../db").collection("teams")

let Notification = function(teamId, jwtUser) {
  this.teamId = teamId
  this.jwtUser = jwtUser
}

Notification.prototype.create = async function() {
  const team = await teamsCollection.findOne({_id: new ObjectID(this.teamId)})

  const text = `User ${this.jwtUser.username} (${this.jwtUser.email}) wants to join team ${team.name}.`

  this.data = {
    type: "join_request",
    to: team.admin,
    from: this.jwtUser._id,
    teamId: this.teamId,
    text: text
  }

  await notificationsCollection.insertOne(this.data)
}

module.exports = Notification