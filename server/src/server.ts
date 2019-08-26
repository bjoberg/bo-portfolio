// Set all environment variables
import dotenv from 'dotenv';

try {
  dotenv.config();
} catch (error) {
  console.error('Error: unable to set environment variables.');
}

import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import {
  groupRouter,
  imageRouter,
  tagRouter,
  imageGroupRouter,
  groupTagRouter,
  imageTagRouter
} from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import mapKeys from 'lodash/mapKeys';
import ApiError from './utils/models/api-error';
// @ts-ignore
import { sequelize } from './database/models';
// @ts-ignore
import definition from 'sequelize-json-schema';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
// import webpack, { Configuration } from 'webpack';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotReloadMiddleware from 'webpack-hot-middleware';
// import * as webpackDevConfig from '../../config/webpack.client.config';

const port = process.env.PORT !== undefined ? process.env.PORT : 5000;
const isProduction = process.env.NODE_ENV === 'production';
const buildPath = isProduction ? 'build' : 'dev';
const app = express();

// Parse body params and attach them to the req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Compress response body for all requests
app.use(compression());

// Secure app by setting various http headers
app.use(helmet());

// Configure swagger UI for route interaction
let swaggerSpecDefinitions: any = {};

mapKeys(sequelize.models, (model, key) => {
  swaggerSpecDefinitions[key] = definition(model)
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(
  {...swaggerSpec, definitions: swaggerSpecDefinitions},
  false,
  {docExpansion: 'none'}
));

/**
 * Get the string representation of provided url
 * @param url string of the url being parsed
 * @param fileExtension type of file being parsed
 */
const getBaseFile = (url: string, fileExtension: string) => {
  const file = url.indexOf(fileExtension);
  return url.substring(0, file + fileExtension.length);
}

/**
 * Send the gzipped version of the requested file
 * @param req Express request object
 * @param res Express response object
 * @param next Express Next function
 * @param contentType type of zipped content being sent (e.g. text/javascript, text/html, et...)
 * @param file that is being requested
 */
const sendGz = (req: Request, res: Response, next: NextFunction, contentType: string, file: string) => {
  try {
    fs.accessSync(path.resolve(`${buildPath}/${file}.gz`));
    req.url = path.resolve(`${file}.gz`);
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', contentType);
  } catch (error) {
    console.log(chalk.yellow(`Warning: unable to resolved ${req.url}.gz as gzip file... sending ${req.url}`));
  } finally {
    next();
  }
}

// Custom routes
const baseUrl = '/api/v1';
app.use(baseUrl, imageRouter);
app.use(baseUrl, groupRouter);
app.use(baseUrl, tagRouter);
app.use(baseUrl, groupTagRouter);
app.use(baseUrl, imageGroupRouter);
app.use(baseUrl, imageTagRouter);

// In 'production' send the gzipped file to the browser
app.get('*.css', async (req: Request, res: Response, next: NextFunction) => {
  const file = getBaseFile(req.url, '.css');
  isProduction ? sendGz(req, res, next, 'text/css', file) : next();
});
app.get('*.js', async (req: Request, res: Response, next: NextFunction) => {
  const file = getBaseFile(req.url, '.js');
  isProduction ? sendGz(req, res, next, 'text/javascript', file) : next();
});

app.use('/', express.static(path.resolve(buildPath)));

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
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.json({
    code: err.status,
    message: err.message
  });
  res.end();
});

app.listen(port, () => {
  console.log(`Starting app in ${chalk.yellow(`${process.env.NODE_ENV}`)} mode...`);
  console.log(`Server started on port ${port}`);
});