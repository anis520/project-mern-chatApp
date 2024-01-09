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
    photo: { type: String, trim: true },
    status: {
      type: String,
      enum: ["seen", "sent"],
      default: "sent",
    },
    trash: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

///exprot model

export default mongoose.model("Chat", chatSchema);
