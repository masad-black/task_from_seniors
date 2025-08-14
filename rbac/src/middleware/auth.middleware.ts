import { Request, Response, NextFunction } from "express";

function isRoleSuperAdmin(req: Request, res: Response, next: NextFunction) {
  // if role is not super_admin
  if (req.user.role !== "super_admin") {
    return res.json({
      statusCode: 401,
      message: "unauthorized access",
    });
  }
  next();
}

function isRoleValid(req: Request, res: Response, next: NextFunction) {
  // only these roles are allowed to create new product record
  if (req.user.role === "admin" || req.user.role === "super_admin") {
    return next();
  }

  // else
  return res.json({
    statusCode: 401,
    message: "unauthorized access",
  });
}

export { isRoleSuperAdmin, isRoleValid };
