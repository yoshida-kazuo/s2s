import { Request } from 'express';
import { validationResult, ValidationChain, ValidationError } from 'express-validator';

export class BaseRequest {
    protected _req: Request;
    protected _errors: ValidationError[]=[];

    constructor(req: Request) {
        this._req = req;
    }

    async validate() {
        for(let rule of this.rules()) {
            await rule.run(this._req);
        }
        const errors = validationResult(this._req);
        this._errors = errors.array();

        return errors.isEmpty();
    }

    public rules(): ValidationChain[] {
        return [
            //
        ];
    }

    public errors(): ValidationError[] {
        return this._errors;
    }

    public expectsJson(): boolean {
        return !!(this._req.headers?.accept && this._req.headers.accept.includes('application/json'));
    }
}
