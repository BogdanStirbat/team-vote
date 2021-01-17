const validator = require("validator")
const bcrypt = require("bcryptjs")

const usersCollection = require('../db').collection('users')

let User = function(data) {
  this.data = data
  this.errors = []
}

User.prototype.cleanUp = function() {
  // Make sure that input data is string and not json
  if (typeof(this.data.username) != "string") {
    this.data.username = ""
  }
  if (typeof(this.data.email) != "string") {
    this.data.email = ""
  }
  if (typeof(this.data.password) != "string") {
    this.data.password = ""
  }

  //Get rid of any extra properties
  this.data = {
    username: this.data.username.trim(),
    email: this.data.email.trim(),
    password: this.data.password
  }
}

User.prototype.validate = async function() {
  if (this.data.username == "") {
    this.errors.push("Username is empty.")
  }
  if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {
    this.errors.push("Username can only contain letters and numbers.")
  }
  if (this.data.username.length > 0 && this.data.username.length < 3) {
    this.errors.push("Username must be at least 3 characters long.")
  }
  if (this.data.username.length > 30) {
    this.errors.push("The username can have at most 30 characters.")
  }
  if (!validator.isEmail(this.data.email)) {
    this.errors.push("Invalid email address.")
  }
  if (this.data.password.length > 0 && this.data.password.length < 10) {
    this.errors.push("The password must contain at least 10 characters.")
  }
  if (this.data.password.length > 50) {
    this.errors.push("The password can contain at most 50 characters.")
  }

  let userWithSameEmail = await usersCollection.findOne({email: this.data.email})
  if (userWithSameEmail) {
    this.errors.push("This email address is already taken.")
  }
}

User.prototype.signUp = function() {
  return new Promise(async (resolve, reject) => {
    this.cleanUp()
    await this.validate()

    if (!this.errors.length) {
      let salt = bcrypt.genSaltSync(10)
      this.data.password = bcrypt.hashSync(this.data.password, salt)
      await usersCollection.insertOne(this.data)
      resolve()
    } else {
      reject(this.errors)
    }
  })
}

User.prototype.login = function() {
  return new Promise(async (resolve, reject) => {
    this.cleanUp()

    usersCollection.findOne({email: this.data.email}).then((foundUser) => {
      if (foundUser && bcrypt.compareSync(this.data.password, foundUser.password)) {
        this.data = foundUser
        resolve("Login succesfully.")
      } else {
        reject("Invalid username / password.")
      }
    }).catch(function(e) {
      console.log("An error occurred searching for a user", e)
      reject("An error occurred connecting to DB. Please try again later.")
    })
  })
}

module.exports = User