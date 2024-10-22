"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const allowedOrigins = [
    // "https://flat-match-frontend.vercel.app",
    "http://localhost:3000",
];
// CORS configuration
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use("/api/v1", routes_1.default);
app.get("/", (req, res) => {
    res.send({
        message: "Flat Share API..........",
    });
});
// Global error handler
app.use(globalErrorHandler_1.default);
// Not found routes
app.use(notFound_1.default);
exports.default = app;
