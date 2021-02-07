const Notification = require("../models/Notification")

exports.getCurrentUserNotifications = async function(req, res) {
  const notifications = await Notification.getCurrentUserNotifications(req.jwtUser)
  res.status(200).send(notifications)
}

exports.markNotificationRead = async function(req, res) {
  const success = await Notification.markNotificationRead(req.params.id, req.jwtUser)
  if (success) {
    res.status(204).send()
  } else {
    res.status(400).send()
  }
}

exports.deleteNotification = async function(req, res) {
  const success = await Notification.deleteNotification(req.params.id, req.jwtUser)
  if (success) {
    res.status(204).send()
  } else {
    res.status(400).send()
  }
}