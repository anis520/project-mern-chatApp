import asyncHandler from "express-async-handler";
import Product from "../models/product.js";
import { uploadcloud } from "../utils/cloudnary.js";
import { getDataUri } from "../utils/datauri.js";
import { createSlug } from "../utils/slugCreate.js";

import { v2 as cloudinary } from "cloudinary";

/**
 *
 * @DESC Create  Product data
 * @ROUTE /api/vi/product
 * @method POST
 * @access public
 *
 */

export const createProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      slug,
      productSimple,
      productVariable,
      productGroup,
      productExternal,
      productType,
    } = req.body;
    console.log(req.body);

    // file upoloads
    let productPhotos = [];
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        let filedata = await uploadcloud(req.files[i].path);
        productPhotos.push(filedata);
      }
    }

    const product = await Product.create({
      name,
      slug,
      productSimple:
        productType == "simple" ? { ...productSimple, productPhotos } : null,
      productVariable: productType == "variable" ? [productVariable] : null,
      productGroup: productType == "group" ? [productGroup] : null,
      productExternal: productType == "external" ? productExternal : null,
    });
    res.status(200).json({ product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

/**
 *
 * @DESC Get all Products data
 * @ROUTE /api/vi/product
 * @method GET
 * @access public
 *
 */

export const getallProduct = async (req, res, next) => {
  try {
    const {
      productType,
      productSimple,
      productVariable,
      productGroup,
      productExternal,
      shortDesc,
      longDesc,
    } = req.body;
    console.log(req.body);

    const product = await Product.find();

    res.json({ product, msg: "done" });
  } catch (error) {
    next(error);
  }
};
export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    product ? res.json(product) : res.json({ message: "product not found" });
  } catch (error) {
    next(error);
  }
};
