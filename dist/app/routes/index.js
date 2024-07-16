"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const booking_routes_1 = require("../modules/booking/booking.routes");
const contact_routes_1 = require("../modules/contact/contact.routes");
const flat_routes_1 = require("../modules/flats/flat.routes");
const team_routes_1 = require("../modules/team/team.routes");
const user_routes_1 = require("../modules/user/user.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/users",
        route: user_routes_1.userRoutes,
    },
    {
        path: "/auth",
        route: auth_routes_1.authRoutes,
    },
    {
        path: "/contact",
        route: contact_routes_1.contactRoutes,
    },
    {
        path: "/flats",
        route: flat_routes_1.flatRoutes,
    },
    {
        path: "/bookings",
        route: booking_routes_1.bookingRoutes,
    },
    {
        path: "/teams",
        route: team_routes_1.teamRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
