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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _this = this;
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
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var chalk_1 = __importDefault(require("chalk"));
// import webpack, { Configuration } from 'webpack';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotReloadMiddleware from 'webpack-hot-middleware';
// import * as webpackDevConfig from '../../config/webpack.client.config';
var port = process.env.PORT !== undefined ? process.env.PORT : 5000;
var isProduction = process.env.NODE_ENV === 'production';
var buildPath = isProduction ? 'build' : 'dev';
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
/**
 * Get the string representation of provided url
 * @param url string of the url being parsed
 * @param fileExtension type of file being parsed
 */
var getBaseFile = function (url, fileExtension) {
    var file = url.indexOf(fileExtension);
    return url.substring(0, file + fileExtension.length);
};
/**
 * Send the gzipped version of the requested file
 * @param req Express request object
 * @param res Express response object
 * @param next Express Next function
 * @param contentType type of zipped content being sent (e.g. text/javascript, text/html, et...)
 * @param file that is being requested
 */
var sendGz = function (req, res, next, contentType, file) {
    try {
        fs.accessSync(path.resolve(buildPath + "/" + file + ".gz"));
        req.url = path.resolve(file + ".gz");
        res.set('Content-Encoding', 'gzip');
        res.set('Content-Type', contentType);
    }
    catch (error) {
        console.log(chalk_1.default.yellow("Warning: unable to resolved " + req.url + ".gz as gzip file... sending " + req.url));
    }
    finally {
        next();
    }
};
// Custom routes
var baseUrl = '/api/v1';
app.use(baseUrl, routes_1.imageRouter);
app.use(baseUrl, routes_1.groupRouter);
app.use(baseUrl, routes_1.tagRouter);
app.use(baseUrl, routes_1.groupTagRouter);
app.use(baseUrl, routes_1.imageGroupRouter);
app.use(baseUrl, routes_1.imageTagRouter);
// In 'production' send the gzipped file to the browser
app.get('*.css', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var file;
    return __generator(this, function (_a) {
        file = getBaseFile(req.url, '.css');
        isProduction ? sendGz(req, res, next, 'text/css', file) : next();
        return [2 /*return*/];
    });
}); });
app.get('*.js', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var file;
    return __generator(this, function (_a) {
        file = getBaseFile(req.url, '.js');
        isProduction ? sendGz(req, res, next, 'text/javascript', file) : next();
        return [2 /*return*/];
    });
}); });
app.use('/', express_1.default.static(path.resolve(buildPath)));
// Custom webpack configuration for 'development' mode
// You need this for hmr and webpack-dev-server usage
if (!isProduction) {
    // const webpackCompiler = webpack(webpackDevConfig as Configuration);
    // const devMiddleware = webpackDevMiddleware(webpackCompiler, {
    //   publicPath: webpackDevConfig.output.publicPath
    // });
    // app.use(webpackHotReloadMiddleware(webpackCompiler));
    // app.use(devMiddleware);
    // // Since the webpack dev server starts it's own server, we want to explicity send our app to the browser
    // // webpack-dev-server serves from memory, so we need the buffer, no the actual file.
    // app.get('*', (req: Request, res: Response) => {
    //   const htmlBuffer: Buffer = devMiddleware.fileSystem.readFileSync(`${path.resolve(buildPath)}/index.html`) as Buffer;
    //   res.send(htmlBuffer.toString());
    // });
}
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
    console.log("Starting app in " + chalk_1.default.yellow("" + process.env.NODE_ENV) + " mode...");
    console.log("Server started on port " + port);
});
