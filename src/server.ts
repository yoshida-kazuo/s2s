import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import dotenv from 'dotenv';
import webRoutes from './routes/webRoutes';
import apiRoutes from './routes/apiRoutes';

dotenv.config();
export const appName = process.env.APP_NAME;
export const appPath = process.env.APP_PATH;
export const appUrl = process.env.APP_URL;
export const appPort = process.env.APP_PORT;

const app = express();

app.use(expressLayouts)
    .set('layout', 'layouts/default')
    .set('view engine', 'ejs')
    .set('views', path.join(__dirname, 'views'))
    .use('/', webRoutes)
    .use('/api', apiRoutes)
    .listen(appPort, () => {
        console.log(`Server is running at ${appUrl}:${appPort}`);
    });
