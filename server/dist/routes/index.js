"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var group_routes_1 = __importDefault(require("./group.routes"));
exports.groupRouter = group_routes_1.default;
var groupTag_routes_1 = __importDefault(require("./groupTag.routes"));
exports.groupTagRouter = groupTag_routes_1.default;
var image_routes_1 = __importDefault(require("./image.routes"));
exports.imageRouter = image_routes_1.default;
var imageGroup_routes_1 = __importDefault(require("./imageGroup.routes"));
exports.imageGroupRouter = imageGroup_routes_1.default;
var tag_routes_1 = __importDefault(require("./tag.routes"));
exports.tagRouter = tag_routes_1.default;
var imageTag_routes_1 = __importDefault(require("./imageTag.routes"));
exports.imageTagRouter = imageTag_routes_1.default;
