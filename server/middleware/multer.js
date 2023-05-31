import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const upload = multer({ dest: 'uploads/' });

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path); // Upload the file to Cloudinary
    return result.secure_url; // Return the secure URL of the uploaded file
  } catch (error) {
    throw new Error("Failed to upload file to Cloudinary");
  }
}

export {upload,uploadToCloudinary}