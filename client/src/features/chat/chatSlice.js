import { createSlice } from "@reduxjs/toolkit";
import { createChat, getChatByUser, getUpdateChat } from "./chatApiSlice";

// create chat slice
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    onlineUser: [],
    message: null,
    error: null,
    loader: false,
    chatSuccess: false,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
      state.chatSuccess = false;
    },
    setOnlineUser: (state, action) => {
      state.onlineUser = action.payload;
    },
    setRealTimeMsg: (state, action) => {
      state.chats.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // createchat
      .addCase(createChat.pending, (state, action) => {})
      .addCase(createChat.fulfilled, (state, action) => {
        state.chats.push(action.payload.data);
        state.chatSuccess = action.payload.data;
      })
      // get chat by user
      .addCase(getChatByUser.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getChatByUser.fulfilled, (state, action) => {
        state.chats = action.payload.data;
        state.loader = false;
      })
      //udate chat
      .addCase(getUpdateChat.fulfilled, (state, action) => {
        state.chats[
          state.chats.findIndex((data) => data._id === action.payload._id)
        ] = action.payload;
      });
  },
});

// selectors
export const getChat = (state) => state.chat;
// actions
export const { setMessageEmpty, setOnlineUser, setRealTimeMsg } =
  chatSlice.actions;

// export
export default chatSlice.reducer;
