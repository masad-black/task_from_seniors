import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import ApiResponse from "../utils/api_response.js";
import prisma from "../db/prisma.js";

function isJwtValid(req, res, next) {
  try {
    const { auth_token } = req.cookies;

    if (!auth_token) {
      return ApiResponse.error(
        res,
        "Unathorized access",
        400,
        "Token required"
      );
    }

    jwt.verify(auth_token, process.env.JWT_PRIVATE_KEY, async (err, decode) => {
      if (err) {
        return ApiResponse.error(res, "Unathorized access", 400, err.name);
      }

      const user = await prisma.user.findUnique({
        where: {
          id: decode.id,
        },
      });

      if (user === null) {
        return ApiResponse.error(res, "Unathorized user", 401);
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.log("__error in token validation__", error);
    return ApiResponse.error(req, "INTERNAL SERVER ERROR");
  }
}

function isRoleAdmin(req, res, next) {
  if (req.user.role === "admin") {
    return next();
  }

  return ApiResponse.error(
    res,
    "Unathorized access",
    401,
    "No access to this resource"
  );
}

function authorize(resource, action) {
  return (req, res, next) => {
    // if user is "admin" to need to check permissions
    if (req.user.role === "admin") {
      console.log("__role is admin__");

      return next();
    }

    // if permission is null no access is allowed
    if (req.user.permission === null) {
      return ApiResponse.error(res, "Unathorized access", 401);
    }

    // checking for permissiosn
    for (let per of req.user.permission) {
      if (per.name === resource && per.priviliges.includes(action)) {
        return next();
      }
    }

    return ApiResponse.error(res, "Unathorized access", 401);
  };
}

export { isJwtValid, isRoleAdmin, authorize };
