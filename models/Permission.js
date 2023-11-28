import mongoose from "mongoose";

// schema
const perrmissionSchema = mongoose.Schema(
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
    },
    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// export model
export default mongoose.model("Permission", perrmissionSchema);
