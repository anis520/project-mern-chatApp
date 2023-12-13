import { createSlice } from "@reduxjs/toolkit";
import {
  activateAccountByOTP,
  activation,
  createUser,
  getLoggedInUser,
  loginUser,
  logoutUser,
  resendActivation,
  resendPassword,
  resendPasswordToken,
} from "./authApiSlice";

// create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    message: null,
    error: null,
    loader: false,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },

    setLogout: (state) => {
      state.message = null;
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // createuser
      .addCase(createUser.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.loader = false;
      })
      // activateAccountByOTP
      .addCase(activateAccountByOTP.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(activateAccountByOTP.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(activateAccountByOTP.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.loader = false;
        state.user = action.payload.user;
      })
      // activateAccountByLINK
      .addCase(activation.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(activation.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(activation.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.loader = false;
      })
      /// user login
      .addCase(loginUser.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = action.payload.user;
        state.loader = false;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = null;
        localStorage.removeItem("user");
      })
      .addCase(getLoggedInUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.user = null;
      })
      .addCase(getLoggedInUser.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      // resend link
      .addCase(resendActivation.rejected, (state, action) => {
        state.error = action.error.message;
        state.user = null;
      })
      .addCase(resendActivation.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      // resend link
      .addCase(resendPassword.rejected, (state, action) => {
        state.error = action.error.message;
        state.user = null;
      })
      .addCase(resendPassword.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      // resend token
      .addCase(resendPasswordToken.rejected, (state, action) => {
        state.error = action.error.message;
        state.user = null;
      })
      .addCase(resendPasswordToken.fulfilled, (state, action) => {
        state.message = action.payload.message;
      });
  },
});

// selectors
export const getAuthData = (state) => state.auth;
// actions
export const { setMessageEmpty, setLogout } = authSlice.actions;

// export
export default authSlice.reducer;
