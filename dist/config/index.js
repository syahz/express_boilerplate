"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET_KEY = exports.LOG_DIR = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.env' });
_a = process.env, exports.PORT = _a.PORT, exports.LOG_DIR = _a.LOG_DIR, exports.SECRET_KEY = _a.SECRET_KEY;
