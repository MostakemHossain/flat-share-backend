"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectUserFields = exports.userFilterAbleFields = exports.userSearchAbleFields = void 0;
exports.userSearchAbleFields = ["email", "fullName", "userName"];
exports.userFilterAbleFields = [
    "name",
    "email",
    "searchTerm",
    "status",
    "role",
];
exports.selectUserFields = {
    id: true,
    fullName: true,
    userName: true,
    email: true,
    profilePhoto: true,
    isDeleted: true,
    status: true,
    role: true,
    createdAt: true,
    updatedAt: true,
};
