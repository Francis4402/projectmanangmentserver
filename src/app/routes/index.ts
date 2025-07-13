import { Router } from "express";

import userRoutes from "./userRoutes";
import projectRoutes from "./projectRoutes";
import taskRoutes from "./taskRoutes";
import searchRoutes from "./searchRoutes";
import teamRoutes from "./teamRoutes";


const router = Router();

const moduleRoutes = [
    {
        path: "/users",
        route: userRoutes
    },
    {
        path: "/projects",
        route: projectRoutes
    },
    {
        path: "/tasks",
        route: taskRoutes
    },
    {
        path: "/search",
        route: searchRoutes
    },
    {
        path: "/teams",
        route: teamRoutes
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;