import { PrismaClient } from "@prisma/client";
import { UserRole } from "../types/usertype";
import catchAsync from "./catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction } from "express";


import { User } from "@prisma/client";


declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}

const prisma = new PrismaClient();

const auth = (...requiredRoles: UserRole[]) => {
  return catchAsync(async (req, res, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "You are not authorized!" });
    }
    const token = authHeader.split(" ")[1];
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "secretkey"
      ) as JwtPayload;
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const { role, email } = decoded;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }
    req.user = user;
    return next();
  });
};

export default auth;