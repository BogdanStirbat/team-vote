const apiRouter = require("express").Router()
const cors = require("cors")

const userController = require("./controllers/userController")
const teamsController = require("./controllers/teamsController")
const joinRequestController = require("./controllers/joinRequestController")

apiRouter.use(cors())

apiRouter.get("/", (req, res) => res.send("Backend API is running."))

apiRouter.post("/sign-up", userController.signUp)
apiRouter.post("/login", userController.login)

apiRouter.post("/teams", userController.checkJwtToken, teamsController.create)
apiRouter.get("/teams/my-teams", userController.checkJwtToken, teamsController.getLoggedInUserTeams)
apiRouter.get("/teams/:id/logged-in-user/membership-info", userController.checkJwtToken, teamsController.getTeamMembershipInfo)
apiRouter.get("/teams/search/", userController.checkJwtToken, teamsController.searchTeams)

apiRouter.post("/join-requests", userController.checkJwtToken, joinRequestController.sendJoinRequest)
apiRouter.get("/join-requests", userController.checkJwtToken, joinRequestController.joinRequestSent)
apiRouter.put("/join-request/:id/approve", userController.checkJwtToken, joinRequestController.approveJoinRequest)
apiRouter.put("/join-request/:id/decline", userController.checkJwtToken, joinRequestController.declineJoinRequest)
apiRouter.get("/join-request/team/:id", userController.checkJwtToken, joinRequestController.joinRequestsForTeam)

module.exports = apiRouter