"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFormuser = void 0;
const express_validator_1 = require("express-validator");
const userFormHelper_1 = require("../helpers/userFormHelper");
exports.validateFormuser = [
    (0, express_validator_1.check)('name')
        .exists()
        .not()
        .notEmpty()
        .isLength({ min: 3 })
        .isString()
        .trim()
        .withMessage('This field is required'),
    (0, express_validator_1.check)('email')
        .isEmail()
        .notEmpty()
        .isString()
        .normalizeEmail()
        .trim()
        .withMessage('This field is required'),
    (0, express_validator_1.check)('phone')
        .trim()
        .custom((value, { req: Request }) => {
        if (value.length === 0)
            return true;
        if (value.length >= 9 && value.length <= 12)
            return true;
        throw new Error('Please enter a valid phone number');
    }),
    (0, express_validator_1.check)('company')
        .trim()
        .isString(),
    (0, express_validator_1.check)('subject')
        .trim()
        .isString()
        .notEmpty()
        .withMessage('This field is required'),
    (0, express_validator_1.check)('message')
        .notEmpty()
        .trim()
        .isString()
        .isLength({ min: 10, max: 250 })
        .withMessage('This field is required'),
    (req, res, next) => {
        (0, userFormHelper_1.validateResult)(req, res, next);
    }
];
