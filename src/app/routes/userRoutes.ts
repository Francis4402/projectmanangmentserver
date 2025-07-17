import { Router } from "express";

import { getUser, getUsers, login, register } from "../controllers/userController";
import auth from "../utils/authMiddleware";
import { UserRole } from "../types/usertype";


const router = Router();

router.get("/allusers", auth(UserRole.ADMIN), getUsers);
router.post("/register", register);
router.post("/login", login);
router.get("/:email", auth(UserRole.ADMIN, UserRole.USER), getUser);

export default router;