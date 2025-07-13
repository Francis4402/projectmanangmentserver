"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var projectController_1 = require("../controllers/projectController");
var router = (0, express_1.Router)();
router.get("/", projectController_1.getProjects);
router.post("/", projectController_1.createProject);
exports.default = router;
