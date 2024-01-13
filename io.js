import colors from "colors";

import { Server } from "socket.io";

const io = new Server(8000, {
  cors: {
    origin: "*",
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
    io.emit("userarray", users);
  });

  socket.on("realTimeMsgSend", (data) => {
    const checkIsOnline = users.find((d) => d._id == data.receiverId);
    console.log(checkIsOnline);
    if (checkIsOnline) {
      socket.to(checkIsOnline.socketId).emit("realTimeMsgGet", data);
    }
  });

  socket.on("disconnect", (data) => {
    console.log("user disconnected" + data.bgRed);
    removeuserdata(socket.id);

    io.emit("userarray", users);
  });
});
