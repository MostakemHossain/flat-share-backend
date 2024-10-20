"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const fileUpload_1 = require("../../shared/fileUpload");
const user_controller_1 = require("./user.controller");
const user_validtion_1 = require("./user.validtion");
const router = express_1.default.Router();
router.post("/create-user", (0, validateRequest_1.default)(user_validtion_1.userValidation.createUser), user_controller_1.userController.userRegistration);
router.get("/", 
// auth(userRole.SUPER_ADMIN, userRole.ADMIN),
user_controller_1.userController.getAllUser);
router.get("/:userId", user_controller_1.userController.getSingleUser);
router.delete("/:userId", user_controller_1.userController.deleteAUser);
router.patch("/profile/update-my-profile", (0, auth_1.default)(client_1.userRole.ADMIN, client_1.userRole.SUPER_ADMIN, client_1.userRole.USER), fileUpload_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return user_controller_1.userController.updateMyProfile(req, res, next);
});
router.get("/profile/me", (0, auth_1.default)(client_1.userRole.ADMIN, client_1.userRole.SUPER_ADMIN, client_1.userRole.USER), user_controller_1.userController.getMyProfile);
router.put("/update-role/:id", (0, auth_1.default)(client_1.userRole.ADMIN, client_1.userRole.SUPER_ADMIN), user_controller_1.userController.updateRoleAndStatus);
exports.userRoutes = router;
