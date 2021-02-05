const JoinRequest = require("../models/JoinRequest")

exports.sendJoinRequest = async function(req, res) {
  let joinRequest = new JoinRequest(req.body.teamId, req.jwtUser)

  const successCreated = await joinRequest.create()
  if (!successCreated) {
    res.status(400).send(joinRequest.errors)
    return
  }

  res.status(200).send()
}

exports.joinRequestSent = async function(req, res) {
  const joinRequest = await JoinRequest.findJoinRequest(req.query.teamId, req.jwtUser._id)
  if (joinRequest) {
    res.status(200).send({exists: true})
  } else {
    res.status(200).send({exists: false})
  }
}

exports.approveJoinRequest = async function(req, res) {
  const inserted = await JoinRequest.approveJoinRequest(req.params.id, req.jwtUser._id)

  if (inserted) {
    res.status(200).send({inserted: true})
  } else {
    res.status(200).send({inserted: false})
  }
}

exports.declineJoinRequest = async function(req, res) {
  const deleted = await JoinRequest.deleteJoinRequest(req.params.id, req.jwtUser._id)
  if (deleted) {
    res.status(200).send({deleted: true})
  } else {
    res.status(200).send({deleted: false})
  }
}

exports.joinRequestsForTeam = async function(req, res) {
  const joinRequests = await JoinRequest.joinRequestsForTem(req.params.id, req.jwtUser)
  if (!joinRequests) {
    res.status(400).send()
  } else {
    res.status(200).send(joinRequests)
  }
}