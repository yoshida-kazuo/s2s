import { Request } from 'express';

export class BaseRequest extends Request {
    //

    public validate(): boolean {
        return true;
    }
}
