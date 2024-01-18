import mongoose from "mongoose";

//schema
const chatSchema = mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
    },
    reaction: { type: String, enum: ["like", "love", "smile", "sad"] },
    photo: { type: String, trim: true },
    status: {
      type: String,
      enum: ["seen", "sent"],
      default: "sent",
    },
    trash: {
      type: Boolean,
      default: false,
    },
    bookmark: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

///exprot model

export default mongoose.model("Chat", chatSchema);
