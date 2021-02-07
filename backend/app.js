const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/', require("./router"))

const server = require("http").createServer(app)
global.server = server

// import sockets.js, so that it starts listening to incoming requests
const sockets = require("./sockets")

module.exports = server