import { check } from 'express-validator';
import { validateResult } from '../helpers/userFormHelper';
import { body } from 'express-validator';
import { NextFunction } from 'express';
import { Request, Response } from 'express';


export const validateFormuser = [
    check('name')
        .exists()
        .not()
        .notEmpty()
        .isLength({min:3})
        .isString()
        .trim()
        .withMessage('This field is required'),
    check('email')
        .isEmail()
        .notEmpty()
        .isString()
        .normalizeEmail()
        .trim()
        .withMessage('This field is required'),
    check('phone')
        .trim()
        .custom((value, {req:Request}) =>{
            if(value.length === 0) return true
            if(value.length >= 9 && value.length <= 12) return true;
            throw new Error ('Please enter a valid phone number');
        }),
    check('company')
        .trim()
        .isString(),
    check('subject')
        .trim()
        .isString()
        .notEmpty()
        .withMessage('This field is required'),
    check('message')
        .notEmpty()
        .trim()
        .isString()
        .isLength({min: 10, max: 250})
        .withMessage('This field is required'),
    (req:Request, res:Response, next: NextFunction) => {
        validateResult(req, res, next)
    }
];
