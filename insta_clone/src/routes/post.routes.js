import express from "express";

import {
  createNewPost,
  updatePost,
  deletePost,
  getAllPosts,
  getSpecifcPost,
} from "../controllers/post.controllers.js";
import {
  createCommentOnPost,
  getSinglePostComments,
} from "../controllers/comments.controllers.js";
import multerUpload from "../middlewares/multer.middleware.js";
import uploadImage from "../middlewares/cloudinary.middleware.js";
import { authorize, isJwtValid } from "../middlewares/auth.middleware.js";

const router = express.Router();

// post
router.get("/", getAllPosts);
router.get("/:postId", getSpecifcPost);

router.post("/", multerUpload.single("file"), uploadImage, createNewPost);

router.put("/:postId", multerUpload.single("file"), uploadImage, updatePost);

router.delete("/:postId", deletePost);

// post/comments routes
router.get("/:postId/comments", getSinglePostComments);

router.post("/:postId/comments", createCommentOnPost);

export default router;
