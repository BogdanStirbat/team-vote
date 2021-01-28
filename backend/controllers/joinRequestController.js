const JoinRequest = require("../models/JoinRequest")
const Notification = require("../models/Notification")

exports.sendJoinRequest = async function(req, res) {
  let joinRequest = new JoinRequest(req.body.teamId, req.jwtUser)

  const successCreated = await joinRequest.create()
  if (!successCreated) {
    res.status(400).send(joinRequest.errors)
    return
  }

  let notification = new Notification(req.body.teamId, req.jwtUser)
  await notification.create()

  res.status(200).send()
}