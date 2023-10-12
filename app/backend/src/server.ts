import session = require('express-session');
import { MemoryStore, Session, SessionData, Store } from "express-session";
import path from 'path';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import webRoutes from './routes/webRoutes';
import apiRoutes from './routes/apiRoutes';
import ioRoutes from './routes/ioRoutes';
import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

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
app.use('/', webRoutes)
    .use('/api', apiRoutes)
    .use('/static', express.static(__dirname + '/public'));

io.on('connection', ioRoutes);

server.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
});
