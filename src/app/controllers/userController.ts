import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;


  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || !user.password) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const token = jwt.sign(
    { userId: user.userId, email: user.email, teamId: user.teamId, role: user.role, profilePictureUrl: user.profilePictureUrl },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "7d" }
  );

  
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const { password: _, ...userWithoutPassword } = user;

  return res.json({
    message: "Login Successful",
    user: userWithoutPassword,
    token,
  }).status(200);
});


export const register = catchAsync(async (req, res) => {
  try {
    const { username, email, password, profilePictureUrl, teamId } = req.body;
    
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      res.status(401).json({ message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const cognitoId = uuidv4();

      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          profilePictureUrl,
          teamId,
          cognitoId,
        },
      });
      
      const token = jwt.sign(
        { userId: newUser.userId, email: newUser.email },
        process.env.JWT_SECRET || "secretkey",
        { expiresIn: "7d" }
      );
      
      
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      
      const { password: _, ...userWithoutPassword } = newUser;
      res.json({ message: "User created successfully", user: userWithoutPassword, token });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error registering user: ${error.message}` });
  }
})

export const getUsers = catchAsync(async (_req, res): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving users: ${error.message}` });
  }
})

export const getUser = catchAsync(
  async (req, res): Promise<void> => {
    const { email } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
  
      res.json(user);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: `Error retrieving user: ${error.message}` });
    }
  }
)