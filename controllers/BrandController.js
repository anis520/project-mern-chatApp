import asyncHandler from "express-async-handler";

import Brand from "../models/Brand.js";
import cloudinary, { Deletecloud, uploadcloud } from "../utils/cloudnary.js";
import { createSlug, getPublicId } from "../utils/slugCreate.js";
import { CreateError } from "../utils/createError.js";

export const CreateBrand = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const slug = createSlug(name);
    console.table(req.file);
    if (!name) {
      res.status(400).json({ message: "name are requird" });
    }
    // upoade to cloud
    let brandphto = await uploadcloud(req.file.path);

    const brand = await Brand.create({
      name,
      slug,
      logo: brandphto.secure_url,
    });

    console.log(getPublicId(brand.logo));
    if (brand) {
      res.json({ brand });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    // throw error;
  }
});

// gett all brand
export const GetallBrand = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.find();

    brand ? res.json(brand) : res.json({ message: "not found" });
  } catch (error) {
    // next(error.message);
  }
});
// delete brand
export const DeleteBrand = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (brand) {
      const deletelogo = await Deletecloud(getPublicId(brand.logo));
      console.log(deletelogo.result);
    }
    brand ? res.json(brand) : res.json({ message: "not found" });
  } catch (error) {
    // next(error.message);
  }
});

// delete brand
export const UpdateBrand = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    let oldlogo = brand.logo;
    if (brand) {
      if (req.file) {
        let brandphto = await uploadcloud(req.file.path);
        console.log(brandphto);
        oldlogo = brandphto.secure_url;
        let dele = await Deletecloud(getPublicId(brand.logo));
        console.log(dele);
      }
      let updateBrand = await Brand.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          logo: oldlogo,
        },
        { new: true }
      );
      res.json(updateBrand);
    } else {
      res.json("Brand data not found");
    }
  } catch (error) {
    // next(error.message);
  }
});
