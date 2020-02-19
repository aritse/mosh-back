const express = require("express");
const cors = require("cors");
const session = require("express-session");
const socketio = require("socket.io");
const http = require("http");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

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
});
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true
  })
);
// app.use(cors({
//     origin:["https://*OUR APP NAME HERE*.herokuapp.com"]
// }));
app.use(session({ secret: "something secret here", resave: true, saveUninitialized: true, cookie: { maxAge: 7200000 } }));

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require("./routes");

app.get("/", (req, res) => res.send("Welcome to the back-end of Mosh"));
app.use(routes);
// app.use(cors());

db.sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(`server is listening on http://localhost:${PORT}`));
});
