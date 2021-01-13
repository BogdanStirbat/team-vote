const mongodb = require('mongodb')
const dotenv = require('dotenv')
dotenv.config()

mongodb.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
  if (err) {
    console.log(err)
  }
  console.log("Connected to the database.")
  module.exports = client.db()
  const app = require('./app')
  app.listen(process.env.PORT)
})