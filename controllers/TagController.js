import Tag from "../models/Tag.js";
import asyncHandler from "express-async-handler";
import { createSlug } from "../utils/slugCreate.js";

export const CreateTag = asyncHandler(async (req, res) => {
  try {
    const slug = createSlug(req.body.name);
    console.log(req.body.name);

    const tag = await Tag.create({ name: req.body.name, slug });

    res.json({ tag, message: "create tag successfull" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// gett all brand
export const GetallTag = asyncHandler(async (req, res) => {
  try {
    const tag = await Tag.find();

    res.json(tag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete brand
export const DeleteTag = asyncHandler(async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);

    res.json({ tag, message: "Delete tag successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update permition status
export const TagStatusUpdate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // create new user data
  const tag = await Tag.findByIdAndUpdate(id, { status }, { new: true });

  // check
  if (tag) {
    return res.status(201).json({ message: "Tag updated", tag });
  } else {
    return res.status(400).json({ message: "Invalid Tag data" });
  }
});
