import express from "express";

import {
  deleteComment,
  updateComment,
} from "../controllers/comments.controllers.js";

const router = express.Router();

router.delete("/:commentId", deleteComment);

router.put("/:commentId", updateComment);

export default router;
