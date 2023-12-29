import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "./userApiSlice";

// create auth slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    permission: null,
    role: null,
    users: null,
    error: null,
    message: null,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
      });
  },
});

// selectors
export const getAllPermissionData = (state) => state.user;
// actions
export const { setMessageEmpty } = userSlice.actions;

// export
export default userSlice.reducer;
