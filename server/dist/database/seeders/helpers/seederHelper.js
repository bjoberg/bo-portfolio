'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var uuidv4 = require('uuid/v4');
module.exports = /** @class */ (function () {
    function SeederHelper(queryInterface) {
        this.queryInterface = queryInterface;
    }
    SeederHelper.prototype.deleteAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.queryInterface.bulkDelete('imageGroups', null, {})];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.queryInterface.bulkDelete('groupTags', null, {})];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.queryInterface.bulkDelete('imageTags', null, {})];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.queryInterface.bulkDelete('tags', null, {})];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.queryInterface.bulkDelete('groups', null, {})];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.queryInterface.bulkDelete('images', null, {})];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SeederHelper.prototype.getIdByTitle = function (table, title) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.queryInterface.sequelize.query("SELECT id from \"" + table + "\"\n      WHERE title='" + title + "';")];
                    case 1:
                        id = _a.sent();
                        return [2 /*return*/, id[0][0].id];
                }
            });
        });
    };
    SeederHelper.prototype.createTags = function () {
        return this.queryInterface.bulkInsert('tags', [
            {
                id: uuidv4(),
                title: 'landscape',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: uuidv4(),
                title: 'urban',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: uuidv4(),
                title: 'mountians',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: uuidv4(),
                title: 'water',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    };
    SeederHelper.prototype.createGroups = function () {
        return this.queryInterface.bulkInsert('groups', [{
                id: uuidv4(),
                thumbnailUrl: 'https://www.testUrl.com',
                imageUrl: 'https://www.testUrl.com',
                title: 'Natural Landscape',
                description: 'This is a group',
                createdAt: new Date(),
                updatedAt: new Date()
            }], {});
    };
    SeederHelper.prototype.createImages = function () {
        return this.queryInterface.bulkInsert('images', [{
                id: uuidv4(),
                thumbnailUrl: 'https://www.testUrl.com',
                imageUrl: 'https://www.testUrl.com',
                title: 'Test Image',
                description: 'This is a super awesome image!',
                location: 'Chicago, IL',
                createdAt: new Date(),
                updatedAt: new Date()
            }], {});
    };
    SeederHelper.prototype.createImageGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var groupId, imageId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getIdByTitle('groups', 'Natural Landscape')];
                    case 1:
                        groupId = _a.sent();
                        return [4 /*yield*/, this.getIdByTitle('images', 'Test Image')];
                    case 2:
                        imageId = _a.sent();
                        return [2 /*return*/, this.queryInterface.bulkInsert('imageGroups', [{
                                    id: uuidv4(),
                                    imageId: imageId,
                                    groupId: groupId,
                                    createdAt: new Date(),
                                    updatedAt: new Date()
                                }], {})];
                }
            });
        });
    };
    SeederHelper.prototype.createGroupTags = function () {
        return __awaiter(this, void 0, void 0, function () {
            var groupId, tagId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getIdByTitle('groups', 'Natural Landscape')];
                    case 1:
                        groupId = _a.sent();
                        return [4 /*yield*/, this.getIdByTitle('tags', 'landscape')];
                    case 2:
                        tagId = _a.sent();
                        return [2 /*return*/, this.queryInterface.bulkInsert('groupTags', [{
                                    id: uuidv4(),
                                    tagId: tagId,
                                    groupId: groupId,
                                    createdAt: new Date(),
                                    updatedAt: new Date()
                                }], {})];
                }
            });
        });
    };
    SeederHelper.prototype.createImageTags = function () {
        return __awaiter(this, void 0, void 0, function () {
            var imageId, tagId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getIdByTitle('images', 'Test Image')];
                    case 1:
                        imageId = _a.sent();
                        return [4 /*yield*/, this.getIdByTitle('tags', 'landscape')];
                    case 2:
                        tagId = _a.sent();
                        return [2 /*return*/, this.queryInterface.bulkInsert('imageTags', [{
                                    id: uuidv4(),
                                    tagId: tagId,
                                    imageId: imageId,
                                    createdAt: new Date(),
                                    updatedAt: new Date()
                                }], {})];
                }
            });
        });
    };
    return SeederHelper;
}());
