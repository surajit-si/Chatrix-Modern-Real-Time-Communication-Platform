import { v2 as cloudinary } from "cloudinary";
import ApiError from "./ApiError.js";
import fs from "fs/promises";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function uploadOnCloudinary(filePath) {
  if (!filePath) {
    throw new ApiError(500, "file path not found when uploading file to db.");
  }
  try {

    const file = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    await fs.unlink(filePath);
    return file;
  } catch (error) {
    console.error("Cloudinary Error Detail:", error);
    await fs.unlink(filePath).catch(() => {}); // Clean up local file even on failure
    throw new ApiError(500, "Cloudinary upload failed", error.message || error);
  }
}

export default uploadOnCloudinary;
