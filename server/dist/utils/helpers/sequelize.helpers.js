"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaults_1 = require("../models/defaults");
var SequelizeHelpers = /** @class */ (function () {
    function SequelizeHelpers() {
        this.limitDefault = defaults_1.LIMIT_DEFAULT;
        this.pageDefault = defaults_1.PAGE_DEFAULT;
    }
    /**
     * Set the limit for a particular request based on its query params
     * @param req Express request object containing page query
     */
    SequelizeHelpers.prototype.setPage = function (req) {
        if (req.query !== undefined && req.query.page === undefined) {
            req.query.page = this.pageDefault;
        }
        return req;
    };
    /**
     * Set the page for a particular request based on its query params
     * @param req Express request object containing limit query
     */
    SequelizeHelpers.prototype.setLimit = function (req) {
        if (req.query !== undefined && req.query.limit === undefined) {
            req.query.limit = this.limitDefault;
        }
        return req;
    };
    return SequelizeHelpers;
}());
exports.default = SequelizeHelpers;
