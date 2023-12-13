import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// register user
export const createUser = createAsyncThunk("auth/createUser", async (data) => {
  try {
    console.log(data);
    const response = await axios.post(
      "http://localhost:9000/api/v1/register",
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// register user
export const activateAccountByOTP = createAsyncThunk(
  "auth/activateAccountByOTP",
  async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        `http://localhost:9000/api/v1/activation-by-otp/${data.token}`,
        { otp: data.otp },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk("auth/loginUser", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:9000/api/v1/login",
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// actication by link user
export const activation = createAsyncThunk("auth/activation", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:9000/api/v1/activation/" + data,
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// logout user
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const response = await axios.get(
      "http://localhost:9000/api/v1/logout",
      "",
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Login user
export const getLoggedInUser = createAsyncThunk(
  "auth/getLoggedInUser",
  async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/v1/me", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// resend Activation
export const resendActivation = createAsyncThunk(
  "auth/resendActivation",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/resend-activation",
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// resend Activation
export const resendPassword = createAsyncThunk(
  "auth/resendPassword",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/resetpassword",
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// resend Activation
export const resendPasswordToken = createAsyncThunk(
  "auth/resendPasswordToken",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:9000/api/v1/resetpassword/${data.token}`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
