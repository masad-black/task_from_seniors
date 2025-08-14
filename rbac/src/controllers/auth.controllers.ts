import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { prisma } from "../db/prisma_connect.ts";
import ApiResponse from "../utils/api_response.ts";
import { hashPassword, checkPassword } from "../utils/password.ts";

dotenv.config();

// any role can create a user record in db
async function registerNewUser(req: Request, res: Response) {
  const { name, age, email, password } = req.body;

  // todo: password lenght must be >= 8

  try {
    const hPass = await hashPassword(password);

    const newAdmin = await prisma.users.create({
      data: {
        name,
        age: Number.parseInt(age),
        role: "user",
        email,
        password: hPass,
      },
    });

    // jwt access token
    const accessToken = jwt.sign({ id: newAdmin.id }, process.env.JWT_SECRET, {
      expiresIn: "120s", // expires in 2min
    });

    return res
      .cookie("jwt_token", accessToken)
      .json(new ApiResponse(200, null, newAdmin));
  } catch (error) {
    console.error("___error in creating user record___", error);
    prisma.$disconnect();
    return res.json({
      statusCode: 500,
      message: "INTERNAL_SERVER_ERROR",
    });
  }
}

// giving new access token to users
async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!req.body.email || !req.body.password)
    return res.json({
      statusCode: 400,
      message: "email and password are required",
    });
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (!user)
      return res.json({
        statusCode: 404,
        message: "Incorrect email or password",
      });
    const check = await checkPassword(password, user.password);
    if (!check)
      return res.json({
        statusCode: 404,
        message: "Incorrect email or password",
      });

    // jwt access token
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "120s", // expires in 2min
    });

    return res
      .cookie("jwt_token", accessToken)
      .json(new ApiResponse(200, "new access token", null));
  } catch (error) {
    console.error("___error in login user___", error);
    prisma.$disconnect();
    return res.json({
      statusCode: 500,
      message: "INTERNAL_SERVER_ERROR",
    });
  }
}

async function registerNewAdmin(req: Request, res: Response) {
  const { name, age, email, password } = req.body;

  try {
    const hPass = await hashPassword(password);

    const newAdmin = await prisma.users.create({
      data: {
        name,
        age: Number.parseInt(age),
        role: "admin",
        email,
        password: hPass,
      },
    });

    // jwt access token
    const accessToken = jwt.sign({ id: newAdmin.id }, process.env.JWT_SECRET, {
      expiresIn: "120s", // expires in 2min
    });

    return res
      .cookie("jwt_token", accessToken)
      .json(new ApiResponse(200, null, newAdmin));
  } catch (error) {
    console.error("___error in creating user record___", error);
    prisma.$disconnect();
    return res.json({
      statusCode: 500,
      message: "INTERNAL_SERVER_ERROR",
    });
  }
}
async function switchRoleToAdmin(req: Request, res: Response) {
  const { email } = req.body;

  try {
    const updatedUser = await prisma.users.update({
      where: { email },
      data: {
        role: "admin",
      },
    });

    res.json(new ApiResponse(200, null, updatedUser));
  } catch (error) {
    console.error("___error in creating user record___", error);
    prisma.$disconnect();
    return res.json({
      statusCode: 500,
      message: "INTERNAL_SERVER_ERROR",
    });
  }
}

export { registerNewUser, loginUser, registerNewAdmin, switchRoleToAdmin };
