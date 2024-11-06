"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
// public-api.ts
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user-controller");
exports.publicRouter = express_1.default.Router();
exports.publicRouter.get('/', user_controller_1.root);
exports.publicRouter.get('/api/user', user_controller_1.get);
exports.publicRouter.post('/api/user', user_controller_1.create);
exports.publicRouter.patch('/api/user/:username', user_controller_1.update);
