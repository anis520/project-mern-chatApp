// import Category from '../models/Category.js'
import Catagory from "../models/Category.js";
import { createSlug, getPublicId } from "../utils/slugCreate.js";
import asynchandler from "express-async-handler";

import cloudinary, { Deletecloud, uploadcloud } from "../utils/cloudnary.js";

export const CreateCatagroy = asynchandler(async (req, res) => {
  try {
    const { name, parentCatagory, icon } = req.body;
    const slug = createSlug(name);
    let caticon = null;
    let photo = null;
    let catagory;
    if (icon) {
      caticon = icon;
    }

    if (req.file) {
      let upload = await uploadcloud(req.file.path);
      photo = upload.secure_url;
    }

    if (parentCatagory) {
      catagory = await Catagory.create({
        name,
        slug,
        parentCatagory,
        icon: caticon,
        photo,
      });
      const parent = await Catagory.findByIdAndUpdate(parentCatagory, {
        $push: {
          subCatagory: catagory._id,
        },
      });
    } else {
      catagory = await Catagory.create({ name, slug, icon: caticon, photo });
    }

    res.status(200).json({ catagory, message: "catagory create succefull" });
    0;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const GetallCatagory = asynchandler(async (req, res) => {
  try {
    const catagory = await Catagory.find().populate([
      {
        path: "subCatagory",
        populate: { path: "subCatagory", populate: { path: "subCatagory" } },
      },
      {
        path: "parentCatagory",
        populate: {
          path: "parentCatagory",
          populate: { path: "parentCatagory" },
        },
      },
    ]);

    res.status(200).json({ catagory, message: "all catagroys" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const DeleteCatagory = asynchandler(async (req, res) => {
  try {
    const catatgory = await Catagory.findByIdAndDelete(req.params.id);

    if (catatgory) {
      const deletephoto = await Deletecloud(getPublicId(catatgory.photo));

      res.json(catatgory);
    } else {
      res.json({ msg: "catagroy not found" });
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

// update catagroy
export const UpdateCatagroy = asynchandler(async (req, res) => {
  try {
    // id
    const id = req.params.id;
    const { name, icon, parentCatagory, subCatagory } = req.body;

    // find data
    const data = await Catagory.findById(id);
    if (!data) {
      res.status(404).json({ message: "data not found" });
    }

    // update data
    name ? (data.name = name) : null;
    name ? (data.slug = createSlug(name)) : null;
    icon ? (data.icon = icon) : null;

    if (req.file) {
      const uploadphoto = await uploadcloud(req.file.path);
      data.photo = uploadphoto.secure_url;
      const deletephoto = await Deletecloud(getPublicId(data.photo));
      console.log(deletephoto);
    }

    data.save();

    console.log(req.body);
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
