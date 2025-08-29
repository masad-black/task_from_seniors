import ApiResponse from "../utils/api_response.js";
import prisma from "../db/prisma.js";

async function createCommentOnPost(req, res) {
  const { message } = req.body;
  const { postId } = req.params;

  try {
    const comment = await prisma.comment.create({
      data: {
        message,
        createrId: req.user.id,
        postId,
        likes: [],
      },
    });

    return ApiResponse.success(res, comment, "Comment created", 200);
  } catch (error) {
    console.log("__error in creating new comment__", error);
    return ApiResponse.error(res, "INTERNAL SERVER ERROR", 500, error.name);
  }
}

async function deleteComment(req, res) {
  const { commentId } = req.params;

  try {
    const comment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return ApiResponse.success(res, {}, "Comment deleted", 200);
    return ApiResponse.success(res, comment, "Comment created", 200);
  } catch (error) {
    console.log("__error in deleting comment__", error);
    return ApiResponse.error(res, "INTERNAL SERVER ERROR", 500, error.name);
  }
}

async function updateComment(req, res) {
  const { commentId } = req.params;
  const { message } = req.body;

  try {
    const comment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        message,
      },
    });

    return ApiResponse.success(res, comment, "Comment updated", 200);
  } catch (error) {
    console.log("__error in deleting comment__", error);
    return ApiResponse.error(res, "INTERNAL SERVER ERROR", 500, error.name);
  }
}

async function getSinglePostComments(req, res) {
  const { postId } = req.params;

  try {
    const comment = await prisma.comment.findMany({
      where: {
        postId,
      },
    });

    return ApiResponse.success(res, comment, "Comment updated", 200);
  } catch (error) {
    console.log("__error in getting post comments__", error);
    return ApiResponse.error(res, "INTERNAL SERVER ERROR", 500, error.name);
  }
}

export {
  createCommentOnPost,
  deleteComment,
  updateComment,
  getSinglePostComments,
};
