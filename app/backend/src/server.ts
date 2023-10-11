import session = require('express-session');
import { MemoryStore, Session, SessionData, Store } from "express-session";
import path from 'path';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import webRoutes from './routes/webRoutes';
import apiRoutes from './routes/apiRoutes';
import dotenv from 'dotenv';
dotenv.config();

export const appPath = path.resolve(__dirname, process.env.APP_PATH!);
export const appName = process.env.APP_NAME;
export const appUrl = process.env.APP_URL;
export const appPort = process.env.APP_PORT;

const app = express();

declare module "express-session" {
    interface SessionData {
        errors: any;
    }
}

app.use(expressLayouts)
    .use(session({
        secret: 'your-secret-key',
        name: 'application',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 }
    }))
    .use('/dist', express.static(__dirname + '/dist/client'));
app.set('layout', 'layouts/default')
    .set('view engine', 'ejs')
    .set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(__dirname + '/public'))
    .use('/api', apiRoutes);
app.listen(appPort, () => {
        console.log(`Server is running at ${appUrl}:${appPort}`);
    });
