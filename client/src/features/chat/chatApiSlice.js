import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Creat chat
export const createChat = createAsyncThunk("chat/createChat", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:9000/api/v1/chat",
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
//get chat by user
export const getChatByUser = createAsyncThunk(
  "chat/getChatByUser",
  async (data) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/getChatByUser/${data}`,
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
