const express = require("express");

const {
  getAllPhones,
  addNewPhone,
  deletePhone,
  updatePhoneData,
} = require("../controllers/phone.controller.js");
const uploads = require("../middleware/multer.middleware.js");

const router = express.Router();

router.get("", getAllPhones);

router.post("", uploads.single("phone_images"), addNewPhone);

router.delete("/:phoneId", deletePhone);

router.put("/:phoneId", updatePhoneData);

module.exports = router;
