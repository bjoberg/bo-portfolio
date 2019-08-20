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
var _this = this;
var httpStatus = require('http-status');
var omitBy = require('lodash').omitBy;
var isNil = require('lodash').isNil;
var LIMIT_DEFAULT = require('../../utils/models/defaults').LIMIT_DEFAULT;
var PAGE_DEFAULT = require('../../utils/models/defaults').PAGE_DEFAULT;
module.exports = function (sequelize, DataTypes) {
    var groupTag = sequelize.define('groupTag', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                isUUID: 4,
                notEmpty: true
            }
        },
        groupId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'groups',
                key: 'id'
            },
            validate: {
                isUUID: 4,
                notEmpty: true
            }
        },
        tagId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'tags',
                key: 'id'
            },
            validate: {
                isUUID: 4,
                notEmpty: true
            }
        }
    }, {});
    groupTag.associate = function (models) {
        // associations can be defined here
    };
    /**
     * Get all of the groupTags that match a certain query
     * @param {Object} json object with properties to query with
     * @returns all of the groupTags containing the specified query items
     * @throws error if query fails
     */
    groupTag.list = function (_a) {
        var page = _a.page, limit = _a.limit, groupId = _a.groupId, tagId = _a.tagId;
        return __awaiter(_this, void 0, void 0, function () {
            var options, getAllOptions;
            return __generator(this, function (_b) {
                try {
                    options = omitBy({
                        groupId: groupId, tagId: tagId
                    }, isNil);
                    getAllOptions = {
                        where: options
                    };
                    if (limit) {
                        getAllOptions.limit = limit;
                    }
                    else {
                        getAllOptions.limit = LIMIT_DEFAULT;
                    }
                    if (page) {
                        getAllOptions.offset = page * limit;
                    }
                    else {
                        getAllOptions.offset = PAGE_DEFAULT;
                    }
                    return [2 /*return*/, groupTag.findAndCountAll(getAllOptions)];
                }
                catch (error) {
                    throw {
                        status: httpStatus.INTERNAL_SERVER_ERROR,
                        message: "Error fetching groupTags."
                    };
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Try and find a group by its id.
     * @param {string} id of the group being searched for
     * @returns group item
     * @throws error if query fails
     */
    groupTag.get = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var item, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, groupTag.findOne({
                            where: {
                                id: id
                            }
                        })];
                case 1:
                    item = _a.sent();
                    if (item)
                        return [2 /*return*/, item];
                    throw {
                        status: httpStatus.NOT_FOUND,
                        message: "groupTag, " + id + ", deleted or does not exist."
                    };
                case 2:
                    error_1 = _a.sent();
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    /**
     * Delete all of the groupTags that match a certain query
     * @param {Object} json object with properties to query with
     * @returns number of groupTag rows affected
     * @throws error if query fails
     */
    groupTag.deleteAll = function (_a) {
        var groupId = _a.groupId, tagId = _a.tagId;
        return __awaiter(_this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_b) {
                try {
                    options = omitBy({
                        groupId: groupId, tagId: tagId
                    }, isNil);
                    return [2 /*return*/, groupTag.destroy({
                            where: options
                        })];
                }
                catch (error) {
                    throw {
                        status: httpStatus.INTERNAL_SERVER_ERROR,
                        message: "Error deleting groupTag(s)."
                    };
                }
                return [2 /*return*/];
            });
        });
    };
    return groupTag;
};
