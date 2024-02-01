import colors from "colors";

import { Server } from "socket.io";

// socket server setup
const io = new Server(8000, {
  cors: {
    origin: "*",
  },
});

let users = [];

// client adding
const adduserdata = (data, Id) => {
  const chekuser = users.some((u) => u._id == data._id);
  let info = data;
  info.socketId = Id;
  if (!chekuser) {
    users.push(info);
  }
};

// removing client
const removeuserdata = (data) => {
  users = users.filter((u) => u.socketId != data);
};

//socket connection
io.on("connection", (socket) => {
  console.log("socket connection successful".bgCyan);

  // add user socket
  socket.on("addUser", (data) => {
    adduserdata(data, socket.id);
    io.emit("userarray", users);
  });

  // logout user filtering
  socket.on("removeLogoutUser", (data) => {
    users = users.filter((u) => u._id != data);
    io.emit("userarray", users);
  });

  // sending message ot another client
  socket.on("realTimeMsgSend", (data) => {
    const checkIsOnline = users.find((d) => d._id == data.receiverId);
    if (checkIsOnline) {
      socket.to(checkIsOnline.socketId).emit("realTimeMsgGet", data);
    }
  });
  // typing message animation socket
  socket.on("typingAnimationSend", (data) => {
    const checkIsOnline = users.find((d) => d._id == data.reciverId);
    if (checkIsOnline) {
      console.log(checkIsOnline);
      socket.to(checkIsOnline.socketId).emit("typingAnimationGet", data);
    }
  });

  // disconnecting client
  socket.on("disconnect", (data) => {
    console.log("user disconnected" + data.bgRed);
    removeuserdata(socket.id);

    io.emit("userarray", users);
  });
});
