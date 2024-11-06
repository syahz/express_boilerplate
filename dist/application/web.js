"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.web = void 0;
const express_1 = __importDefault(require("express"));
const api_1 = require("../routes/api");
const error_middleware_1 = require("../middleware/error-middleware");
const cors_1 = __importDefault(require("cors"));
exports.web = (0, express_1.default)();
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};
exports.web.use((0, cors_1.default)(corsOptions));
exports.web.use((0, cors_1.default)(corsOptions));
exports.web.use(express_1.default.json());
exports.web.use(api_1.publicRouter);
exports.web.use(error_middleware_1.errorMiddleware);
