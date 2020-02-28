const express = require("express");
const cors = require("cors");
const config = require("./config");
const expresssession = require("express-session");
const socketio = require("socket.io");
const http = require("http");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
require("dotenv").config();
const app = express();
const server = http.createServer(app);

const session = expresssession({ secret: config.SESSION_SECRET, resave: true, saveUninitialized: true, cookie: { maxAge: 7200000 } });
app.use(session);

const io = socketio(server);
io.on("connect", socket => handleSocket(socket));

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use(
  cors({
    // origin: ["https://moshsocial.herokuapp.com"],
    origin: config.CORS_ORIGIN,
    credentials: true
  })
);

const routes = require("./routes");
app.get("/", (req, res) => res.send("server is up and running"));
app.use(routes);

db.sequelize.sync({ force: false }).then(() => {
  server.listen(config.PORT, () => console.log(`server is listening on ${config.PORT}`));
});

function handleSocket(socket) {
  socket.on("join", ({ name, room }, callback) => {
    name = name || "Chris";
    room = room || "99";
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", { user: "admin", text: `${user.name}, welcome to room ${user.room}.` });
    socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", { user: "Admin", text: `${user.name} has left.` });
      io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });
    }
  });
}
