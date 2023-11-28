// const io =require("socket.io")(
//     8000, {
//   cors: {
//     origin: "*",

//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("socket connsction sucessful");
//   socket.on("addUser", (data) => {
//     console.log(data);
//   });
// }
// )

import colors from "colors";

import { Server } from "socket.io";

const io = new Server(8000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let users = [];

const adduserdata = (data, Id) => {
  const chekuser = users.some((u) => u._id == data._id);
  let info = data;
  info.socketId = Id;
  if (!chekuser) {
    users.push(info);
  }
};
const removeuserdata = (data) => {
  users = users.filter((u) => u.socketId != data);
};

io.on("connection", (socket) => {
  console.log("socket connection successful".bgCyan);
  socket.on("addUser", (data) => {
    adduserdata(data, socket.id);
    console.log(users);
    io.emit("userarray", users);
  });

  socket.on("disconnect", (data) => {
    console.log("user disconnected" + data.bgRed);
    removeuserdata(socket.id);
    console.log(socket.id);
    console.log(users);
    io.emit("userarray", users);
  });
});
