import multer from "multer";

// // create diskstrage
// const storage = multer.diskStorage({
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       Date.now() + "_" + file.originalname.toLowerCase().split(" ").join("-")
//     );
//   },
//   destination: (req, file, cb) => {
//     if (file.fieldname == "category-photo") {
//       cb(null, "api/pubic/category");
//     } else if (file.fieldname == "photo" || file.fieldname == "gallary") {
//       cb(null, "api/pubic/product");
//     } else if (file.fieldname == "brand-photo") {
//       cb(null, "api/pubic/brand");
//     }
//   },
// });

// export const productCategoryMulter = multer({ storage }).single(
//   "category-photo"
// );
// export const productbBrandMulter = multer({ storage }).single("brand-photo");
// export const productMulter = multer({ storage }).fields([
//   {
//     name: "photo",
//     maxCout: 1,
//   },
//   {
//     name: "gallary",
//     maxCout: 10,
//   },
// ]);

// // multer memory storage

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        Math.round(Math.random() * 100000) +
        "_" +
        "s1" +
        file.fieldname
    );
  },
});

export const BrandLogoUpload = multer({ storage }).single("logo");
export const CatagoryPhotoUpload = multer({ storage }).single("catphoto");
export const ProductPhotoUpload = multer({ storage }).single("productphoto");
