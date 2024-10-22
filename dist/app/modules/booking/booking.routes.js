"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_controller_1 = require("./booking.controller");
const booking_validation_1 = require("./booking.validation");
const router = express_1.default.Router();
router.post("/post-a-booking", 
// validateRequest(bookingValidation.postBookingRequestValidationSchema),
(0, auth_1.default)(client_1.userRole.USER), booking_controller_1.bookingController.postBookingRequest);
router.get("/my-booking-request", (0, auth_1.default)(client_1.userRole.USER), booking_controller_1.bookingController.getMyBookingRequest);
router.get("/all-booking-request", (0, auth_1.default)(client_1.userRole.ADMIN, client_1.userRole.SUPER_ADMIN), booking_controller_1.bookingController.getAllBookingRequest);
router.put("/approved-booking/:bookingId", (0, auth_1.default)(client_1.userRole.ADMIN, client_1.userRole.SUPER_ADMIN), (0, validateRequest_1.default)(booking_validation_1.bookingValidation.approvalBookingValidationSchema), booking_controller_1.bookingController.approvalBookingRequest);
exports.bookingRoutes = router;
