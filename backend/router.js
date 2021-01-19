const apiRouter = require("express").Router()
const cors = require("cors")

const userController = require("./controllers/userController")
const teamsController = require("./controllers/teamsController")

apiRouter.use(cors())

apiRouter.get("/", (req, res) => res.send("Backend API is running."))

apiRouter.post("/sign-up", userController.signUp)
apiRouter.post("/login", userController.login)

apiRouter.post("/teams", userController.checkJwtToken, teamsController.create)

module.exports = apiRouter