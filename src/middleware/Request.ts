import { Request, Response, NextFunction } from 'express';
import { BaseRequest } from '../requests/BaseRequest';

export function requestMiddleware(req: Request, res: Response, next: NextFunction) {
    Object.setPrototypeOf(req, BaseRequest.prototype);

    next();
}
