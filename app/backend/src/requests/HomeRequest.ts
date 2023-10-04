import { BaseRequest } from './BaseRequest';
import { body, query, ValidationChain } from 'express-validator';

export class HomeRequest extends BaseRequest {

    public rules(): ValidationChain[] {
        return [
        ];
    }

}
