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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll();
        res.json({ users, total: users.length });
    }
    catch (error) {
        res.json(error);
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({
                msg: `User with ID ${id} does not exists`
            });
        }
        res.json(user);
    }
    catch (error) {
        res.json(error);
    }
    res.json({
        msg: 'getUser',
        id
    });
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const emailExist = yield user_1.default.findOne({
        where: {
            email: body.email
        }
    });
    if (emailExist) {
        return res.status(400).json({
            msg: `Already exists a user with this email ${body.email}`
        });
    }
    try {
        const user = user_1.default.build(body);
        yield user.save();
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Talk to administrator',
            error
        });
    }
    res.json({
        msg: 'createUser',
        body
    });
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: `The user with ID ${id} does not exist`
            });
        }
        yield user.update(body);
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Talk to administrator',
            error
        });
    }
    res.json({
        id,
        msg: 'updateUser',
        body
    });
});
exports.updateUser = updateUser;
//Create logic delete
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: `The user with ID ${id} does not exist`
            });
        }
        //await user.destroy();
        yield user.update({ status: 0 });
    }
    catch (error) {
        res.json(error);
    }
    res.json({
        user,
        msg: 'Delete user'
    });
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map