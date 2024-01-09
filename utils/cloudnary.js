import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

export const uploadcloud = async (file) => {
  const logo = await cloudinary.v2.uploader.upload(file.path);

  return logo;
};
export const Deletecloud = async (id) => {
  const logo = await cloudinary.v2.uploader.destroy(id);

  return logo;
};

export default cloudinary;
