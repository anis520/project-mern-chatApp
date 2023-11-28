import cloudinary from "cloudinary";
import fs from "fs";
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadcloud = async (img) => {
  const logo = await cloudinary.v2.uploader.upload(img);

  return logo;
};
export const Deletecloud = async (id) => {
  const logo = await cloudinary.v2.uploader.destroy(id);



  
  return logo;
};

export default cloudinary;

// export const uploadcloud = async (img) => {
//   fs.writeFileSync("./" + img.originalname, img.buffer);

//   const logo = await cloudinary.v2.uploader.upload(
//     "./" + img.originalname,
//     img.buffer
//   );

//   fs.unlinkSync("./" + img.originalname);

//   return logo;
// };
