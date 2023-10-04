import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../controllers/BaseController';

export function routeHandler(controller: BaseController) {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (controller.handler) {
            controller.handler(req, res);
        }

        if (controller.setRequest) {
            res.locals.req = controller.setRequest(req, res);
        }

        if (res.locals.req.validate && ! await res.locals.req.validate()) {
            if (res.locals.req.expectsJson()) {
                res.status(400).send({
                    errors: res.locals.req.errors()
                });
            } else {
                const referer = req.headers.referer;
                if (referer) {
                    req.session.errors = res.locals.req.errors();
                    res.redirect(referer);
                } else {
                    res.status(404).send('Not Found');
                }
            }

            return false;
        }

        controller.execute(req, res);
    };
}
