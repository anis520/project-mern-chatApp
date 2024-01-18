import expressAsyncHandler from "express-async-handler";
import Chat from "../models/Chat.js";
import { uploadcloud } from "../utils/cloudnary.js";

export const ChatCreate = expressAsyncHandler(async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.me._id;
    let data;

    if (req.file) {
      const upload = await uploadcloud(req.file);
      data = await Chat.create({
        senderId: senderId,

        receiverId,
        photo: upload.secure_url,
        message,
      });
    } else {
      data = await Chat.create({
        senderId: senderId,
        receiverId,
        message,
      });
    }
    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
export const GetAllChats = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const senderId = req.me._id;

    const data = await Chat.find({
      $or: [
        {
          $and: [{ senderId: { $eq: senderId } }, { receiverId: { $eq: id } }],
        },
        {
          $and: [{ senderId: { $eq: id } }, { receiverId: { $eq: senderId } }],
        },
      ],
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
export const updateChat = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { bookmark } = req.body;

    const data = await Chat.findByIdAndUpdate(id, { bookmark }, { new: true });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
