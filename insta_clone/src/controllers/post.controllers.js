import prisma from "../db/prisma.js";
import ApiResponse from "../utils/api_response.js";

async function createNewPost(req, res) {
  try {
    const { discription } = req.body;
    const { url } = req.upload;

    const post = await prisma.post.create({
      data: {
        createrId: req.user.id,
        discription,
        images: [req.upload.url],
      },
    });

    return ApiResponse.success(res, post, "Post created", 201);
  } catch (error) {
    console.log("__error in creating new post__", error);
    return ApiResponse.error(res, "INTERNAL SERVER ERROR", 500, error.name);
  }
}

async function updatePost(req, res) {
  const { discription } = req.body;
  const { url } = req.upload;
  const { postId } = req.params;

  try {
    const post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        discription,
        images: {
          push: url,
        },
      },
    });

    return ApiResponse.success(res, post, "Post updated", 201);
  } catch (error) {
    console.log("__error in updating  post__", error);
    return ApiResponse.error(res, "INTERNAL SERVER ERROR", 500, error.name);
  }
}

async function deletePost(req, res) {
  const { postId } = req.params;

  console.log("__id__", postId);

  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return ApiResponse.success(res, {}, "Post deleted");
  } catch (error) {
    console.log("__error in deleting post__", error);
    return ApiResponse.error(res, "INTERNAL SERVER ERROR", 500, error.name);
  }
}

async function getAllPosts(req, res) {
  try {
    const comments = [];

    const posts = await prisma.post.findMany({
      select: {
        id: true,
        createrId: true,
        images: true,
        discription: true,
      },
    });

    for (let post of posts) {
      const allComments = await prisma.comment.findMany({
        where: {
          postId: post.id,
        },
      });
      post.comments = [];
      post.comments = [...allComments];
    }

    return ApiResponse.success(res, posts, "All posts records", 201);

    return ApiResponse.success(res, users, "Users fetched successfully");
  } catch (err) {
    console.error("Error fetching users:", err);
    return ApiResponse.error(res, "Failed to fetch users", 500);
  }
}

async function getSpecifcPost(req, res) {
  const { postId } = req.params;

  if (!postId) {
    return ApiResponse.error(res, "Post id is required", 400);
  }

  try {
  } catch (error) {
    console.log("__error in getting post__", error);
    return ApiResponse.error(res, "INTERNAL SERVER ERROR", 500, error.name);
  }
}

export { createNewPost, updatePost, deletePost, getAllPosts, getSpecifcPost };
