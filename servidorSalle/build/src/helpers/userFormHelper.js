"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResult = void 0;
const validation_result_1 = require("express-validator/src/validation-result");
// Validation de users.
const validateResult = (req, res, next) => {
    try {
        (0, validation_result_1.validationResult)(req).throw();
        return next();
    }
    catch (err) {
        res.status(200).send({ error: 'Upps a ocurrido algo mal en tu formulario',
            errors: err.array() });
    }
};
exports.validateResult = validateResult;
module.exports = { validateResult: exports.validateResult };
