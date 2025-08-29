import bcrypt from "bcryptjs";

import ApiResponse from "../utils/api_response.js";
import { generateJwtToken } from "../utils/jwt.js";
import prisma from "../db/prisma.js";

async function registerNewUser(req, res) {
  const { username, email, password, bio } = req.body;

  if (!username || !email || !password) {
    return ApiResponse.error(res, "All fields are required", 400);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        bio: "",
        role: "user",
      },
    });

    const token = generateJwtToken({ id: newUser.id });

    res.cookie("auth_token", token, {});

    return ApiResponse.success(
      res,
      newUser,
      "User registered successfully",
      201
    );
  } catch (error) {
    console.log("__error in registration__", error);
    return ApiResponse.error(res, "INTERNAL SERVER ERROR", 500, error.name);
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return ApiResponse.error(res, "All fields are required", 400);
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const check = await bcrypt.compare(password, user.password);

    if (!check) {
      return ApiResponse.error(res, "Password is not correct", 400);
    }

    const token = generateJwtToken({ id: user.id });

    res.cookie("auth_token", token);

    return ApiResponse.success(res, user, "User loged in successfully", 201);
  } catch (error) {
    console.log("__error in login__", error);
    return ApiResponse.error(res, "INTERNAL SERVER ERROR", 500, error.name);
  }
}

export async function logoutUser(req, res) {
  try {
    // Clear the auth cookie
    res.clearCookie("auth_token", {});

    return ApiResponse.success(res, {}, "User logged out successfully");
  } catch (err) {
    console.error(err);
    return ApiResponse.error(res, "Logout failed", 500);
  }
}

export { registerNewUser, loginUser };
