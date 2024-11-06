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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.createUser = exports.getUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const logger_1 = require("../utils/logger");
const Validation_1 = require("../validation/Validation");
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const user_validation_1 = require("../validation/user-validation");
const user_model_1 = require("../models/user-model");
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield database_1.prismaClient.user.findMany();
    if (users.length === 0) {
        throw new response_error_1.ResponseError(404, 'No users found');
    }
    return users.map(user_model_1.toUserResponse);
});
exports.getUsers = getUsers;
const createUser = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const registerRequest = Validation_1.Validation.validate(user_validation_1.UserValidation.REGISTER, request);
    const totalUserWithSameUsername = yield database_1.prismaClient.user.count({
        where: {
            username: registerRequest.username
        }
    });
    if (totalUserWithSameUsername != 0) {
        throw new response_error_1.ResponseError(400, 'Username already exists');
    }
    registerRequest.password = yield bcrypt_1.default.hash(registerRequest.password, 10);
    const user = yield database_1.prismaClient.user.create({
        data: registerRequest
    });
    return (0, user_model_1.toUserResponse)(user);
});
exports.createUser = createUser;
const updateUser = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const updateRequest = Validation_1.Validation.validate(user_validation_1.UserValidation.UPDATE, request);
    const user = yield database_1.prismaClient.user.findFirst({
        where: {
            username: updateRequest.username
        }
    });
    logger_1.logger.debug(JSON.stringify(user, null, 2));
    if (!user) {
        throw new response_error_1.ResponseError(404, 'User not found');
    }
    if (updateRequest.name) {
        user.name = updateRequest.name;
    }
    if (updateRequest.password) {
        user.password = yield bcrypt_1.default.hash(updateRequest.password, 10);
    }
    const userResult = yield database_1.prismaClient.user.update({
        where: {
            username: updateRequest.username
        },
        data: user
    });
    return (0, user_model_1.toUserResponse)(userResult);
});
exports.updateUser = updateUser;
