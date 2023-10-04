import { Request, Response, NextFunction } from 'express';
import { BaseRequest } from '../requests/BaseRequest';

export abstract class BaseController {
    protected requestClass: any=null;

    public handler(req: Request, res: Response) {
        //
    };

    public setRequest(req: Request, res: Response): BaseRequest | void {
        if (this.requestClass) {
            return new this.requestClass(req);
        }
    }

    abstract execute(req: Request, res: Response): Promise<void> | void;
}
