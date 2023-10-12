import express from 'express';
import { HomeController } from '../controllers/web/HomeController';
import { routeHandler } from '../utils/routeHandler';

const router = express.Router();
const homeController = new HomeController;

router.get('/', routeHandler(homeController));

export default router;
