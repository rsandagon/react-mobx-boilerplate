const express = require("express");
const app = express();
const server = app.listen(9001, () => {
	console.log("Server listening to port 9001");
});
const io = require("socket.io")(server);

io.on("connection", (client) => {
	console.log("Someone connected to heaven");

	client.emit("message", "I hear you");
});