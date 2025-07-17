import { Router } from "express";
import { createProject, getProjects } from "../controllers/projectController";
import auth from "../utils/authMiddleware";
import { UserRole } from "../types/usertype";

const router = Router();

router.get("/", auth(UserRole.ADMIN, UserRole.USER), getProjects);
router.post("/", auth(UserRole.ADMIN, UserRole.USER), createProject);

export default router;