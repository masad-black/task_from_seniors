import express from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import privilegesRoutes from "./privileges.routes.js";
import postRoutes from "./post.routes.js";
import commentRoutes from "./comment.routes.js";
import followRoutes from "./follow.routes.js";

import { isJwtValid } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", isJwtValid, userRoutes);
router.use("/privileges", isJwtValid, privilegesRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/follows", isJwtValid, followRoutes);

export default router;
