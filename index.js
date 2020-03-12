const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const db = require("./models");
const config = require("./config");
const cors = require("cors");
const expresssession = require("express-session");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

const io = socketio(server);
io.on("connect", socket => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", { user: "admin", text: `${user.name}, welcome to room ${user.room}.` });
    socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${user.name} has joined!` });
    io.to(user.room).emit("stat", { room: user.room, users: getUsersInRoom(user.room) });

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
      io.to(user.room).emit("stat", { room: user.room, users: getUsersInRoom(user.room) });
    }
  });
});

app.use(
  cors({
    origin: config.CORS_ORIGIN,
    credentials: true
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

const session = expresssession({ secret: config.SESSION_SECRET, resave: true, saveUninitialized: true, cookie: { maxAge: 7200000 } });
app.use(session);

const routes = require("./routes");
app.get("/", (req, res) => res.send("server is up and running"));
app.use(routes);

db.sequelize.sync({ force: false }).then(() => {
  server.listen(config.PORT, () => console.log(`server is listening on ${config.PORT}`));
});
