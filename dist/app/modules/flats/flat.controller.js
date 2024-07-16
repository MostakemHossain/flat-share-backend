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
exports.flatController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const lodash_1 = require("lodash");
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const flat_constant_1 = require("./flat.constant");
const flat_service_1 = require("./flat.service");
const PostAFlat = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield flat_service_1.flatService.PostAFlat(user, req);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Add a Flat created Successfully",
        data: result,
    });
}));
const getAllFlats = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, lodash_1.pick)(req.query, flat_constant_1.flatFilterAbleFields);
    const options = (0, lodash_1.pick)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield flat_service_1.flatService.getAllFlats(filters, options);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All flats retrieved Successfully",
        data: result,
    });
}));
const deleteAPostFlat = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield flat_service_1.flatService.deleteAPostFlat(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Flat deleted Successfully",
        data: result,
    });
}));
const getAPostFlat = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield flat_service_1.flatService.getAPostFlat(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Flat Retrieved Successfully",
        data: result,
    });
}));
const updateAFlat = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield flat_service_1.flatService.updateAFlat(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Flat Updated Successfully",
        data: result,
    });
}));
exports.flatController = {
    PostAFlat,
    getAllFlats,
    deleteAPostFlat,
    getAPostFlat,
    updateAFlat,
};
