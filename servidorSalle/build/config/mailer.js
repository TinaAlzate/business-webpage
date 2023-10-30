"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require("nodemailer");
exports.transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'valzate618@gmail.com',
        pass: 'holpukgrrruuevyg' // pass proporecionada por Google
    }
});
exports.transporter.verify().then(() => {
    console.log('ready for send mails');
});
