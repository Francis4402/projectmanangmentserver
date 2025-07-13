"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = require("../controllers/userController");
var router = (0, express_1.Router)();
router.get("/", userController_1.getUsers);
router.post("/", userController_1.postUser);
router.get("/:cognitoId", userController_1.getUser);
exports.default = router;
