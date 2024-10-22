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
exports.bookingController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const booking_constant_1 = require("./booking.constant");
const booking_service_1 = require("./booking.service");
const postBookingRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield booking_service_1.bookingService.postBookingRequest(req.body, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Post for a Booking Successfully",
        data: result,
    });
}));
const getMyBookingRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield booking_service_1.bookingService.getMyBookingRequest(user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "MY Booking Request retrieved Successfully",
        data: result,
    });
}));
const getAllBookingRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, booking_constant_1.bookingsFilterAbleFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield booking_service_1.bookingService.getAllBookingRequest(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "ALL Booking Request retrieved Successfully",
        data: result,
    });
}));
const approvalBookingRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.bookingService.approvalBookingRequest(req.body, req.params.bookingId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Approval Booking Successfully",
        data: result,
    });
}));
exports.bookingController = {
    postBookingRequest,
    getMyBookingRequest,
    getAllBookingRequest,
    approvalBookingRequest,
};
