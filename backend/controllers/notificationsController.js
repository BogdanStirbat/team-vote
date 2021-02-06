const Notification = require("../models/Notification")

exports.getCurrentUserNotifications = async function(req, res) {
  const notifications = await Notification.getCurrentUserNotifications(req.jwtUser)
  res.status(200).send(notifications)
}