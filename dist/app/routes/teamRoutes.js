"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var teamController_1 = require("../controllers/teamController");
var router = (0, express_1.Router)();
router.get("/", teamController_1.getTeams);
exports.default = router;
