import mongoose from "mongoose";

//schema
const reviewsSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    review: {
      type: String,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

    status: {
      type: String,
      default: true,
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

export default mongoose.model("reviews", reviewsSchema);
