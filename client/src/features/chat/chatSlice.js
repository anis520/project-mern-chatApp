import { createSlice } from "@reduxjs/toolkit";
import { createChat, getChatByUser } from "./chatApiSlice";

// create chat slice
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    message: null,
    error: null,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // createchat
      .addCase(createChat.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.chats.push(action.payload.data);
        state.loader = false;
      })
      // get chat by user
      .addCase(getChatByUser.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getChatByUser.fulfilled, (state, action) => {
        state.chats = action.payload.data;
        state.loader = false;
      });
  },
});

// selectors
export const getChat = (state) => state.chat;
// actions
export const { setMessageEmpty } = chatSlice.actions;

// export
export default chatSlice.reducer;
