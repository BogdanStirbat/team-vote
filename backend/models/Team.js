const validator = require("validator")

const teamsCollection = require("../db").collection("teams")

let Team = function(data, jwtUser) {
  this.data = data
  this.jwtUser = jwtUser
  this.errors = []
}

Team.prototype.cleanup = function() {
  if (typeof(this.data.name) != "string") {
    this.data.name = ""
  }

  this.data = {
    name: this.data.name,
    admin: this.jwtUser._id
  }
}

Team.prototype.validate = async function() {
  if (this.data.name == "") {
    this.errors.push("Name is not provided.")
  }
  if (this.data.name != "" && !validator.isAlphanumeric(this.data.name)) {
    this.errors.push("Name must contain only letters and numbers.")
  }

  let teamWithSameName = await teamsCollection.findOne({name: this.data.name})
  if (teamWithSameName) {
    this.errors.push("A team with the same name already exists.")
  }
}

Team.prototype.create = function() {
  return new Promise(async (resolve, reject) => {
    this.cleanup()
    await this.validate()

    if (!this.errors.length) {
      await teamsCollection.insertOne(this.data)
      resolve()
    } else {
      reject(this.errors)
    }
  })
}

Team.getLoggedInUserTeams = async function(jwtUser) {
  let adminTeams = await teamsCollection.find({admin: jwtUser._id}).toArray()
  return adminTeams
}

module.exports = Team