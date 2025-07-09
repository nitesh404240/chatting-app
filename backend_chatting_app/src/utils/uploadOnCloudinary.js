import { v2 as Cloudinary } from "cloudinary";
import fs from "fs";

Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,     // Your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY,           // Your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET      // Your Cloudinary API secret
});

const uploadOncloudinary = async (localFilePath) => {
  try {
        if (!localFilePath) return null;
        const response = await Cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });
    return response.secure_url;

    } catch (error) {
          fs.unlinkSync(localFilePath);
          return null;
          }
};

const deleteOnCloudinaryImage = async (imageUrl) => {
  if (!imageUrl) return;

  // Extract public ID from the URL
  const publicId = imageUrl.split('/').pop().split('.')[0]; // gets `abc123` from `.../abc123.jpg`

  try {
    const result = await Cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error("Failed to delete image from Cloudinary");
  }
};
export  {uploadOncloudinary,deleteOnCloudinaryImage}