import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "./userApiSlice";

// create auth slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    permission: null,
    role: null,
    users: null,
    loader: false,
    error: null,
    message: null,
    typing: null,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
    setTypingData: (state, action) => {
      state.typing = action.payload;
    },
    setRealTimeLastMsg: (state, action) => {
      state.users[
        state.users.findIndex((data) => data.userInfo._id === action.payload)
      ] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.loader = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      });
  },
});

// selectors
export const getAllPermissionData = (state) => state.user;
// actions
export const { setMessageEmpty, setRealTimeLastMsg, setTypingData } =
  userSlice.actions;

// export
export default userSlice.reducer;
