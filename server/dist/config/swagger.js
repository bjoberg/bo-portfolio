"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var path_1 = __importDefault(require("path"));
var swaggerDefinition = {
    openapi: '3.0.1',
    info: {
        title: 'Brett Oberg Studio API',
        description: 'API for working with Brett Oberg Studio, LLC portfolio data',
        version: '1.0.0'
    },
    servers: [
        {
            url: '/api/v1'
        }
    ],
    components: {
        parameters: {
            limit: {
                in: 'query',
                name: 'limit',
                description: 'Limits the amount of items returned. [Default: limit = 30]',
                schema: {
                    type: 'integer'
                },
                required: false
            },
            page: {
                in: 'query',
                name: 'page',
                description: 'Get items for a defined range, based on the limit. [Default: page = 0]',
                schema: {
                    type: 'integer'
                },
                required: false
            },
            thumbnailUrl: {
                in: 'query',
                name: 'thumbnailUrl',
                schema: {
                    type: 'string'
                },
                required: false
            },
            imageUrl: {
                in: 'query',
                name: 'imageUrl',
                schema: {
                    type: 'string'
                },
                required: false
            },
            title: {
                in: 'query',
                name: 'title',
                schema: {
                    type: 'string'
                },
                required: false
            },
            description: {
                in: 'query',
                name: 'description',
                schema: {
                    type: 'string'
                },
                required: false
            },
            location: {
                in: 'query',
                name: 'location',
                schema: {
                    type: 'string'
                },
                required: false
            },
            groupId: {
                in: 'query',
                name: 'groupId',
                schema: {
                    type: 'uuid'
                },
                required: false
            },
            groupTagId: {
                in: 'query',
                name: 'groupTagId',
                schema: {
                    type: 'uuid'
                },
                required: false
            },
            imageId: {
                in: 'query',
                name: 'imageId',
                schema: {
                    type: 'uuid'
                },
                required: false
            },
            imageGroupId: {
                in: 'query',
                name: 'imageGroupId',
                schema: {
                    type: 'uuid'
                },
                required: false
            },
            imageTagId: {
                in: 'query',
                name: 'imageTagId',
                schema: {
                    type: 'uuid'
                },
                required: false
            },
            tagId: {
                in: 'query',
                name: 'tagId',
                schema: {
                    type: 'uuid'
                },
                required: false
            }
        }
    }
};
var swaggerOptions = {
    swaggerDefinition: swaggerDefinition,
    apis: [path_1.default.resolve(__dirname, '../routes/*.routes.js')]
};
var swaggerSpec = swagger_jsdoc_1.default(swaggerOptions);
exports.default = swaggerSpec;
