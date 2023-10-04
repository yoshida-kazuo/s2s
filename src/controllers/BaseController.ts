import { Request, Response, NextFunction } from 'express';
import { BaseRequest } from '../requests/BaseRequest';

export abstract class BaseController {
    protected requestClass: any=null;

    public setRequest(req: Request, res: Response, next: NextFunction) {
        if (this.requestClass) {
            Object.setPrototypeOf(req, this.requestClass.prototype);
        }

        next();
    }

    abstract execute(req: Request, res: Response): Promise<void> | void;
}
