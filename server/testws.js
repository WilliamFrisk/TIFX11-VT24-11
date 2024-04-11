const io = require("socket.io-client");

// Replace 'http://localhost:5000/' with the address of your Flask-SocketIO server
const socket = io("http://127.0.0.1:5000/");

socket.on("connect", () => {
  console.log("Connected to Flask-SocketIO server");

  // Send a message to the server
  socket.emit("message", "Hello from the terminal");
});

socket.on("message", (data) => {
  console.log("Received message from server:", data);
});

// Handle disconnection
socket.on("disconnect", () => {
  console.log("Disconnected from Flask-SocketIO server");
});
