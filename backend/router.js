const apiRouter = require("express").Router()
const cors = require("cors")

const userController = require("./controllers/userController")

apiRouter.use(cors())

apiRouter.get("/", (req, res) => res.send("Backend API is running."))

apiRouter.post("/sign-up", userController.signUp)

module.exports = apiRouter