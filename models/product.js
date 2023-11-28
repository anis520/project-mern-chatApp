import mongoose from "mongoose";

// schema
const ProductSchema = mongoose.Schema(
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

      unique: true,
    },
    productType: {
      type: String,
      enum: ["simple", "variable", "group", "external"],

      default: "simple",
    },
    productSimple: {
      regularPrice: {
        type: Number,

        // required: true,
      },
      salePrice: {
        type: Number,
        default: 0,
      },
      photos: {
        type: [String],
        // required: true,
      },
      stock: {
        type: Number,
        default: 0,
      },
    },
    productVariable: [
      {
        colors: { type: String, default: null },
        size: { type: String, default: null },

        regularPrice: {
          type: Number,

          // required: true,
        },
        salePrice: {
          type: Number,
          default: 0,
        },

        stock: {
          type: Number,
          default: 0,
        },
      },
    ],
    productGroup: [
      {
        name: { type: String },
        regularPrice: {
          type: Number,

          // required: true,
        },
        salePrice: {
          type: Number,
          default: 0,
        },

        stock: {
          type: Number,
          default: 0,
        },
      },
    ],
    productExternal: {
      regularPrice: {
        type: Number,

        // required: true,
      },
      salePrice: {
        type: Number,
        default: 0,
      },

      stock: {
        type: Number,
        default: 0,
      },
      link: { type: String },
    },
    shortDesc: {
      type: String,

      trim: true,
    },
    longDesc: {
      type: String,

      trim: true,
    },
    productPhotos: { type: [String], default: [] },
    specification: {
      type: String,
    },
    reviews: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Reviews",
    },
    catagorys: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Category",
    },

    brand: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Brand",
    },
    tags: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "MyTag",
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

// export model
export default mongoose.model("Product", ProductSchema);
