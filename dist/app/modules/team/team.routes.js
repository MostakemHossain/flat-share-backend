"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const fileUpload_1 = require("../../shared/fileUpload");
const team_controller_1 = require("./team.controller");
const router = express_1.default.Router();
router.post("/create-a-team-member", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.ADMIN), fileUpload_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return team_controller_1.teamController.createATeamMember(req, res, next);
});
router.get("/", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.ADMIN), team_controller_1.teamController.getALLTeamMember);
router.get("/:memberId", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.ADMIN), team_controller_1.teamController.getSingleTeamMember);
router.delete("/:memberId", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.ADMIN), team_controller_1.teamController.deleteTeamMember);
router.put("/update-a-team-member/:memberId", (0, auth_1.default)(client_1.userRole.SUPER_ADMIN, client_1.userRole.ADMIN), fileUpload_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return team_controller_1.teamController.updateATeamMember(req, res, next);
});
exports.teamRoutes = router;
