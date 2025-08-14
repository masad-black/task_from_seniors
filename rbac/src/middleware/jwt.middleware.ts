import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import ApiResponse from "../utils/api_response.ts";
import { prisma } from "../db/prisma_connect.ts";

dotenv.config();

interface Decoded {
  id?: string;
}

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

function isJwtValid(req: Request, res: Response, next: NextFunction) {
  const { jwt_token } = req.cookies;

  if (!jwt_token) {
    console.log("__no jwt token___");
    return res.json(new ApiResponse(400, "no token avaliable", null));
  }

  //   checking is token valid or not
  jwt.verify(
    jwt_token,
    process.env.JWT_SECRET,
    async (err: any, decoded: Decoded) => {
      if (err) {
        return res.json({
          stausCode: 401,
          message: err.name,
        });
      }

      // if token is valid
      const user = await prisma.users.findUnique({
        where: {
          id: decoded.id,
        },
      });

      //   setting used object in req
      req.user = { ...user };
      next();
    }
  );
}

export { isJwtValid };
