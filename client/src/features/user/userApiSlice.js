import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all users
export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  try {
    const response = await axios.get("http://localhost:9000/api/v1/user/all", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
