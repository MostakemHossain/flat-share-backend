"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const contact_controller_1 = require("./contact.controller");
const contact_validation_1 = require("./contact.validation");
const router = express_1.default.Router();
router.post("/create-a-contact", (0, validateRequest_1.default)(contact_validation_1.contactValidation.createContactValidationSchema), contact_controller_1.contactController.createAContact);
router.get("/", (0, auth_1.default)(client_1.userRole.ADMIN, client_1.userRole.SUPER_ADMIN), contact_controller_1.contactController.getAllContact);
router.delete("/:id", (0, auth_1.default)(client_1.userRole.ADMIN, client_1.userRole.SUPER_ADMIN), contact_controller_1.contactController.deleteAContact);
exports.contactRoutes = router;
