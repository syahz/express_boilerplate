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
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.create = exports.get = exports.root = void 0;
const user_services_1 = require("../services/user-services");
const root = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            data: 'OK'
        });
    }
    catch (e) {
        next(e);
    }
});
exports.root = root;
const get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, user_services_1.getUsers)();
        res.status(200).json({
            data: response
        });
    }
    catch (e) {
        next(e);
    }
});
exports.get = get;
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req.body;
        const response = yield (0, user_services_1.createUser)(request);
        res.status(200).json({
            data: response
        });
    }
    catch (e) {
        next(e);
    }
});
exports.create = create;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req.body;
        request.username = String(req.params.username);
        const response = yield (0, user_services_1.updateUser)(request);
        res.status(200).json({
            data: response
        });
    }
    catch (e) {
        next(e);
    }
});
exports.update = update;
