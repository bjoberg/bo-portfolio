"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Set all environment variables
var dotenv_1 = __importDefault(require("dotenv"));
try {
    dotenv_1.default.config();
}
catch (error) {
    console.error('Error: unable to set environment variables.');
}
var body_parser_1 = __importDefault(require("body-parser"));
var compression_1 = __importDefault(require("compression"));
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var routes_1 = require("./routes");
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_1 = __importDefault(require("./config/swagger"));
var mapKeys_1 = __importDefault(require("lodash/mapKeys"));
// @ts-ignore
var models_1 = require("./database/models");
// @ts-ignore
var sequelize_json_schema_1 = __importDefault(require("sequelize-json-schema"));
var port = process.env.PORT !== undefined ? process.env.PORT : 5000;
var app = express_1.default();
// Parse body params and attach them to the req.body
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Compress response body for all requests
app.use(compression_1.default());
// Secure app by setting various http headers
app.use(helmet_1.default());
// Configure swagger UI for route interaction
var swaggerSpecDefinitions = {};
mapKeys_1.default(models_1.sequelize.models, function (model, key) {
    swaggerSpecDefinitions[key] = sequelize_json_schema_1.default(model);
});
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(__assign({}, swagger_1.default, { definitions: swaggerSpecDefinitions }), false, { docExpansion: 'none' }));
// Custom routes
var baseUrl = '/api/v1';
app.use(baseUrl, routes_1.imageRouter);
app.use(baseUrl, routes_1.groupRouter);
app.use(baseUrl, routes_1.tagRouter);
app.use(baseUrl, routes_1.groupTagRouter);
app.use(baseUrl, routes_1.imageGroupRouter);
app.use(baseUrl, routes_1.imageTagRouter);
// Custom error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        code: err.status,
        message: err.message
    });
    res.end();
});
app.listen(port, function () {
    console.log("Server started on port " + port);
});
