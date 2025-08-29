import ApiResponse from "../utils/api_response.js";
import uploadImageToCloudinary from "../libs/cloudinary.js";

async function uploadImage(req, res, next) {
  try {
    const cloudinary = await uploadImageToCloudinary(req.file.path);

    if (!cloudinary.url) {
      return ApiResponse.error(res, "Error in uploading file", 500);
    }

    req.upload = cloudinary;

    next();
  } catch (error) {
    console.log("__error in uploading file to cloud__", error);

    return ApiResponse.error(res, "INTERNAL SERVER ERROR", 500, error.messages);
  }
}

export default uploadImage;
