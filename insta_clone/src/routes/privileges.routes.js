import express from "express";

import {
  assignPriviliges,
  updatePriviliges,
  removePriviliges,
} from "../controllers/privileges.controllers.js";
import { isJwtValid, isRoleAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/assign", isRoleAdmin, assignPriviliges);

router.put("/update", isRoleAdmin, updatePriviliges);

router.delete("/remove-all", isRoleAdmin, removePriviliges);

export default router;
