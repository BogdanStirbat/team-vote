const io = require("socket.io") (server, {
  pingTimeout: 30000,
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
})

let users = []

io.on("connection", function(socket) {
  
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
    users = users.filter(user.email != data.email)
  })
})

exports.registerUser = function(user) {
  count++
  users.push(user)
}

exports.print = function() {
  console.log(count)
  users.forEach(user => console.log(user))
}