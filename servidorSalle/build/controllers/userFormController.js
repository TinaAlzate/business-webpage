"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestForm = exports.postUserForm = void 0;
const transportEmail_1 = require("../transports/transportEmail");
const postUserForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const { name, email, phone, company, subject, message } = yield req.body;
        // Function send email and admin
        (0, transportEmail_1.transporEmailFunction)(req);
        return res.status(200).json({
            msg: "Personal dates for user",
            data: {
                name,
                email,
                phone,
                company,
                subject,
                message,
            }
        });
        // throw new Error('Error form, data incomplete');
    }
    catch (error) {
        res.status(500).json({
            msg: error
        });
    }
});
exports.postUserForm = postUserForm;
const getTestForm = (req, res) => {
    res.status(200).json({
        msg: "get Form",
    });
};
exports.getTestForm = getTestForm;
