console.log("This happenned.")

let users = []

exports.onConnection = function(socket) {
  console.log("Connection, sockerId: " + socket.id)

  socket.on("disconnect", () => {
    users = users.filter(user => user.socket.id != socket.id)
  })

  socket.on("userLoggedIn", data => {
    const user = {
      socket: socket,
      username: data.username,
      email: data.email,
      token: data.token
    }

    users.push(user)
  })

  socket.on("userLoggedOut", data => {
    users = users.filter(user => user.email != data.email)
  })
}

exports.sendNotification = function(email, notification) {
  const user = users.find(user => user.email == email)
  if(!user) {
    return
  }

  user.socket.emit("newNotification", notification)
}

exports.registerUser = function(user) {
  count++
  users.push(user)
}

exports.print = function() {
  console.log(count)
  users.forEach(user => console.log(user))
}