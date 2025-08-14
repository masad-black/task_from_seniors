import express from "express";

import {
  getAllProducts,
  createNewProduct,
  deleteProduct,
} from "../controllers/products.controller.ts";
import { isJwtValid } from "../middleware/jwt.middleware.ts";
import {
  isRoleValid,
  isRoleSuperAdmin,
} from "../middleware/auth.middleware.ts";

const router = express.Router();

router.get("/", isJwtValid, getAllProducts);

router.post("", isJwtValid, isRoleValid, createNewProduct);

router.delete("/:productId", isJwtValid, isRoleSuperAdmin, deleteProduct);

export default router;
