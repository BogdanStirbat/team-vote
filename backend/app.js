const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/', require("./router"))

app.listen(3001)