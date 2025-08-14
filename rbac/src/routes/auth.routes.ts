import express from "express";

import {
  registerNewUser,
  loginUser,
  registerNewAdmin,
  switchRoleToAdmin,
} from "../controllers/auth.controllers.ts";
import { isJwtValid } from "../middleware/jwt.middleware.ts";
import { isRoleSuperAdmin } from "../middleware/auth.middleware.ts";

const router = express.Router();

/*
    if i use this route for each role creating
    router.post("/sign-up",isRoleSuperAdmin registerNewUser);
    
 */

router.post("/sign-up", registerNewUser);

router.post("/sign-up/admin", isJwtValid, isRoleSuperAdmin, registerNewAdmin);

router.post("/log-in", loginUser);

router.post("/switch-role", isJwtValid, isRoleSuperAdmin, switchRoleToAdmin);

export default router;
