const express = require('express')
const app = express()

app.get('/', function(req, res) {
    res.send("Backend API is running.")
})

app.listen(3001)