import multer from "multer";
import fs from "fs";
import path from "path";

const NAME = "public";

if (!fs.existsSync(NAME)) {
  fs.mkdirSync(NAME);
}

const folderPath = path.resolve(NAME);

const customStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, folderPath);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${file.fieldname}_${Date.now()}${ext}`;
    cb(null, fileName);
  },
});

const uploads = multer({ storage: customStorage });

export default uploads;
