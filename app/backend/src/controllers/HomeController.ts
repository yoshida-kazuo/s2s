import { Request, Response, NextFunction } from 'express';
import { BaseController } from './BaseController';
import { HomeRequest } from '../requests/HomeRequest';

export class HomeController extends BaseController {
    protected requestClass = HomeRequest;

    async execute(req: Request, res: Response): Promise<void> {
        //

        res.render('index', {
            title: 'Home',
            message: 'Welcom to our website!'
        });
    }
}
