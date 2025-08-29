import prisma from "../db/prisma.js";
import ApiResponse from "../utils/api_response.js";

async function assignPriviliges(req, res) {
  const permission = req.body;
  const { userId } = req.query;

  if (permission.length === 0) {
    return ApiResponse(res, "Fields are required", 400);
  }

  if (!userId) {
    return ApiResponse(res, "Id is required", 400);
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        permission,
      },
    });

    return ApiResponse.success(res, user, "User permission assigned", 201);
  } catch (error) {
    console.log("__error in assigning priviliges__", error);
    return ApiResponse.error(res, "INTERNAL SERVER ERROR", 500, error.name);
  }
}

async function updatePriviliges(req, res) {
  try {
  } catch (error) {
    console.log("__error in updating priviliges__", error);
    return ApiResponse.error(res, "INTERNAL SERVER ERROR", 500, error.name);
  }
}

async function removePriviliges(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return ApiResponse(res, "Id is required", 400);
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        permission: null,
      },
    });

    return ApiResponse.success(res, user, "All permission removed", 201);
  } catch (error) {
    console.log("__error in removing priviliges__", error);
    return ApiResponse.error(res, "INTERNAL SERVER ERROR", 500, error.name);
  }
}

export { assignPriviliges, updatePriviliges, removePriviliges };
