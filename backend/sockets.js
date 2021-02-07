const io = require("socket.io") (server, {
  pingTimeout: 30000,
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
})

io.on("connection", function(socket) {
  console.log("Connection.")
  console.log(socket.id)

  socket.on("userLoggedIn", data => {
    console.log("Received data from client")
    console.log(data)

    socket.emit("userLoggedInAck", {message: "Login ACK"})
  })
})

let users = []
let count = 0

exports.registerUser = function(user) {
  count++
  users.push(user)
}

exports.print = function() {
  console.log(count)
  users.forEach(user => console.log(user))
}