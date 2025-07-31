import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINSRY_NAME,
    api_key: process.env.CLOUDINSRY_API_KEY,
    api_secret: process.env.CLOUDINSRY_SECRET_KEY,
  });
};

export default connectCloudinary;
