import express from 'express';
import { HomeController } from '../controllers/HomeController';
import { requestMiddleware } from '../middleware/Request';

const router = express.Router();
const homeController = new HomeController;

router.get('/', (req, res) => homeController.execute(req, res));

export default router;
