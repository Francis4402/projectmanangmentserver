"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var prisma = new client_1.PrismaClient();
function deleteAllData(orderedFileNames) {
    return __awaiter(this, void 0, void 0, function () {
        var modelNames, modelNames_1, modelNames_1_1, modelName, model, error_1, e_1_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    modelNames = orderedFileNames.map(function (fileName) {
                        var modelName = path_1.default.basename(fileName, path_1.default.extname(fileName));
                        return modelName.charAt(0).toUpperCase() + modelName.slice(1);
                    });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 8, 9, 10]);
                    modelNames_1 = __values(modelNames), modelNames_1_1 = modelNames_1.next();
                    _b.label = 2;
                case 2:
                    if (!!modelNames_1_1.done) return [3 /*break*/, 7];
                    modelName = modelNames_1_1.value;
                    model = prisma[modelName];
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, model.deleteMany({})];
                case 4:
                    _b.sent();
                    console.log("Cleared data from ".concat(modelName));
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _b.sent();
                    console.error("Error clearing data from ".concat(modelName, ":"), error_1);
                    return [3 /*break*/, 6];
                case 6:
                    modelNames_1_1 = modelNames_1.next();
                    return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 10];
                case 8:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 10];
                case 9:
                    try {
                        if (modelNames_1_1 && !modelNames_1_1.done && (_a = modelNames_1.return)) _a.call(modelNames_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var dataDirectory, orderedFileNames, orderedFileNames_1, orderedFileNames_1_1, fileName, filePath, jsonData, modelName, model, jsonData_1, jsonData_1_1, data, e_2_1, error_2, e_3_1;
        var e_3, _a, e_2, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    dataDirectory = path_1.default.join(__dirname, "seedData");
                    orderedFileNames = [
                        "team.json",
                        "project.json",
                        "projectTeam.json",
                        "user.json",
                        "task.json",
                        "attachment.json",
                        "comment.json",
                        "taskAssignment.json",
                    ];
                    return [4 /*yield*/, deleteAllData(orderedFileNames)];
                case 1:
                    _c.sent();
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 16, 17, 18]);
                    orderedFileNames_1 = __values(orderedFileNames), orderedFileNames_1_1 = orderedFileNames_1.next();
                    _c.label = 3;
                case 3:
                    if (!!orderedFileNames_1_1.done) return [3 /*break*/, 15];
                    fileName = orderedFileNames_1_1.value;
                    filePath = path_1.default.join(dataDirectory, fileName);
                    jsonData = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
                    modelName = path_1.default.basename(fileName, path_1.default.extname(fileName));
                    model = prisma[modelName];
                    _c.label = 4;
                case 4:
                    _c.trys.push([4, 13, , 14]);
                    _c.label = 5;
                case 5:
                    _c.trys.push([5, 10, 11, 12]);
                    jsonData_1 = (e_2 = void 0, __values(jsonData)), jsonData_1_1 = jsonData_1.next();
                    _c.label = 6;
                case 6:
                    if (!!jsonData_1_1.done) return [3 /*break*/, 9];
                    data = jsonData_1_1.value;
                    return [4 /*yield*/, model.create({ data: data })];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8:
                    jsonData_1_1 = jsonData_1.next();
                    return [3 /*break*/, 6];
                case 9: return [3 /*break*/, 12];
                case 10:
                    e_2_1 = _c.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 12];
                case 11:
                    try {
                        if (jsonData_1_1 && !jsonData_1_1.done && (_b = jsonData_1.return)) _b.call(jsonData_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 12:
                    console.log("Seeded ".concat(modelName, " with data from ").concat(fileName));
                    return [3 /*break*/, 14];
                case 13:
                    error_2 = _c.sent();
                    console.error("Error seeding data for ".concat(modelName, ":"), error_2);
                    return [3 /*break*/, 14];
                case 14:
                    orderedFileNames_1_1 = orderedFileNames_1.next();
                    return [3 /*break*/, 3];
                case 15: return [3 /*break*/, 18];
                case 16:
                    e_3_1 = _c.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 18];
                case 17:
                    try {
                        if (orderedFileNames_1_1 && !orderedFileNames_1_1.done && (_a = orderedFileNames_1.return)) _a.call(orderedFileNames_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7 /*endfinally*/];
                case 18: return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) { return console.error(e); })
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, prisma.$disconnect()];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); });
