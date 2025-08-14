const cloudinary = require("cloudinary").v2;
const fs = require("fs");

require("dotenv").config();

// cloudinary config setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // for https
});

// uploading image to clouding, and checking some constraints for file
async function uploadImageToCloudinary(filePath) {
  try {
    // checking file path if file exist on the server
    if (!fs.existsSync(filePath)) throw new Error("File doesn't exist");

    // checking supported file extension
    const SUPPORTED_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp"];
    const fileExt = filePath.split(".")[1];

    if (!SUPPORTED_EXTENSIONS.includes(fileExt))
      throw Error(`File type not supported ${fileExt}`);

    // uploading file to cloudinary
    const cloudinaryRes = await new Promise((resolve, reject) => {
      let options = {
        folder: "phone_images",
      };

      cloudinary.uploader.upload(filePath, options, (error, result) => {
        if (error) return reject(error);

        return resolve(result);
      });
    });

    return {
      public_id: cloudinaryRes.public_id,
      url: cloudinaryRes.secure_url,
    };
  } catch (error) {
    console.log(`Error while uploading image: `, error);
    throw new Error(error.message);
  } finally {
    // clean up file from the server
    console.log("---clean file---");
    fs.unlink(filePath, (err) => {
      if (err) throw Error("Error while cleaning up the file");
    });
  }
}

module.exports = uploadImageToCloudinary;
