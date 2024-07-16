"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const fileUpload_1 = require("../../shared/fileUpload");
const flat_controller_1 = require("./flat.controller");
const flat_validation_1 = require("./flat.validation");
const router = express_1.default.Router();
router.post("/post-a-flat", (0, auth_1.default)(client_1.userRole.ADMIN, client_1.userRole.SUPER_ADMIN), fileUpload_1.fileUploader.upload.array("file", 3), (req, res, next) => {
    req.body = flat_validation_1.flatValidation.createFlatValidationSchema.parse(JSON.parse(req.body.data));
    return flat_controller_1.flatController.PostAFlat(req, res, next);
});
router.get("/", flat_controller_1.flatController.getAllFlats);
router.get("/:id", flat_controller_1.flatController.getAPostFlat);
router.delete("/:id", flat_controller_1.flatController.deleteAPostFlat);
router.put("/update/:id", (0, validateRequest_1.default)(flat_validation_1.flatValidation.updateFlatValidationSchema), flat_controller_1.flatController.updateAFlat);
exports.flatRoutes = router;
