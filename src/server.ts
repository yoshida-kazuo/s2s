import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import webRoutes from './routes/webRoutes';
import apiRoutes from './routes/apiRoutes';
import { requestMiddleware } from './middleware/Request';

export const appPath = path.resolve(__dirname, process.env.APP_PATH!);
export const appName = process.env.APP_NAME;
export const appUrl = process.env.APP_URL;
export const appPort = process.env.APP_PORT;

const app = express();

app.use(requestMiddleware)
    .use(expressLayouts)
    .set('layout', 'layouts/default')
    .set('view engine', 'ejs')
    .set('views', path.join(__dirname, 'views'))
    .use('/', webRoutes)
    .use('/api', apiRoutes)
    .listen(appPort, () => {
        console.log(`Server is running at ${appUrl}:${appPort}`);
    });
