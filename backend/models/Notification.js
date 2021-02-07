const ObjectID = require('mongodb').ObjectID

const notificationsCollection = require("../db").collection("notifications")
const teamsCollection = require("../db").collection("teams")

let Notification = function(teamId, jwtUser, type) {
  this.teamId = teamId
  this.jwtUser = jwtUser
  this.type = type
}

Notification.prototype.create = async function() {
  const team = await teamsCollection.findOne({_id: new ObjectID(this.teamId)})
  
  if (this.type == "join_request") {

    this.data = {
      type: "join_request",
      to: team.admin,
      from: this.jwtUser._id,
      teamId: this.teamId,
      text: `User ${this.jwtUser.username} (${this.jwtUser.email}) wants to join team ${team.name}.`
    }
  }

  if (this.type == "join_request_approved") {

    this.data = {
      type: "join_request_approved",
      to: this.jwtUser._id,
      from: team.admin,
      teamId: this.teamId,
      text: `Your request to join the team ${team.name} has been approved.`
    }
  }

  await notificationsCollection.insertOne(this.data)
}

Notification.getCurrentUserNotifications = async function(jwtUser) {
  const notifications = notificationsCollection.find({to: jwtUser._id}).toArray()
  return notifications
}

Notification.markNotificationRead = async function(notificationId, jwtUser) {
  const notification = await notificationsCollection.findOne({_id: new ObjectID(notificationId)})
  if (!notification) {
    return false
  }
  if (notification.from != jwtUser._id && notification.to != jwtUser._id) {
    return false
  }

  await notificationsCollection.updateOne(
    {_id: new ObjectID(notificationId)},
    {
      $set: {
        seen: true
      }
    }
  )

  return true
}

Notification.deleteNotification = async function(notificationId, jwtUser) {
  const notification = await notificationsCollection.findOne({_id: new ObjectID(notificationId)})
  if (!notification) {
    return false
  }
  if (notification.from != jwtUser._id && notification.to != jwtUser._id) {
    return false
  }
  
  const deleteResult = await notificationsCollection.deleteOne({_id: new ObjectID(notificationId)})
  return deleteResult.deletedCount == 1? true: false
}

module.exports = Notification