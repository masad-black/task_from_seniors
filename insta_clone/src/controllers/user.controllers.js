import ApiResponse from "../utils/api_response.js";
import prisma from "../db/prisma.js";

async function getAllUsers(req, res) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        bio: true,
        permission: true,
      },
    });

    return ApiResponse.success(res, users, "Users fetched successfully");
  } catch (err) {
    console.error("Error fetching users:", err);
    return ApiResponse.error(res, "Failed to fetch users", 500);
  }
}

async function updateUser(req, res) {
  const data = req.body;

  const keys = Object.keys(data);
  if (keys.includes("permissions") || keys.includes("role")) {
    return ApiResponse.error(res, "Give data not correct", 400);
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        ...data,
      },
    });

    return ApiResponse.success(res, {}, "User data updated");
  } catch (error) {
    console.error("__error in updating users__:", error);
    return ApiResponse.error(res, "Failed to update users", 500);
  }
}

async function deleteUser(req, res) {
  try {
    const user = await prisma.user.delete({
      where: {
        id: req.user.id,
      },
    });

    res.send("__user deleted__");
  } catch (error) {
    console.error("__error in updating users__:", error);
    return ApiResponse.error(res, "Failed in deleting user", 500);
  }
}

export { getAllUsers, updateUser, deleteUser };
