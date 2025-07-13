"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userRoutes_1 = __importDefault(require("./userRoutes"));
var projectRoutes_1 = __importDefault(require("./projectRoutes"));
var taskRoutes_1 = __importDefault(require("./taskRoutes"));
var searchRoutes_1 = __importDefault(require("./searchRoutes"));
var teamRoutes_1 = __importDefault(require("./teamRoutes"));
var router = (0, express_1.Router)();
var moduleRoutes = [
    {
        path: "/users",
        route: userRoutes_1.default
    },
    {
        path: "/projects",
        route: projectRoutes_1.default
    },
    {
        path: "/tasks",
        route: taskRoutes_1.default
    },
    {
        path: "/search",
        route: searchRoutes_1.default
    },
    {
        path: "/teams",
        route: teamRoutes_1.default
    }
];
moduleRoutes.forEach(function (route) { return router.use(route.path, route.route); });
exports.default = router;
