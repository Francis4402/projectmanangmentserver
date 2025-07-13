"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var searchController_1 = require("../controllers/searchController");
var router = (0, express_1.Router)();
router.get("/", searchController_1.search);
exports.default = router;
