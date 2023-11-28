import mongoose from "mongoose";

//schema
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    icon: {
      type: String,
      trim: true,
      default: null,
    },
    photo: {
      type: String,
      trim: true,
      default: null,
    },
    parentCatagory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    subCatagory: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Category",
      default: null,
    },
    status: {
      type: Boolean,
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

export default mongoose.model("Category", categorySchema);
