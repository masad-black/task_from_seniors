import express from "express";

import {
  registerNewUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/register-user", registerNewUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
