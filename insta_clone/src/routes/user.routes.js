import express from "express";

import { isJwtValid } from "../middlewares/auth.middleware.js";
import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/", getAllUsers);

router.put("/", updateUser);

router.delete("/", deleteUser);

export default router;
