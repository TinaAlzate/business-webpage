import { validationResult } from 'express-validator/src/validation-result';
import { Request, Response } from 'express';
import { NextFunction } from 'express';

// Validation de users.
export const validateResult = (req: Request, res: Response, next: NextFunction) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (err:any) {
        res.status(200).send({ error: 'Upps a ocurrido algo mal en tu formulario',
        errors: err.array()});
    }
}

module.exports = { validateResult }