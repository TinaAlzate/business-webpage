"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporEmailFunction = void 0;
const mailer_1 = require("../config/mailer");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const transporEmailFunction = (req) => {
    // Ruta de template email (HTML)..
    const filePath = path_1.default.join(__dirname, '..', 'views', 'sendEmail.html');
    const emailTemplate = fs_1.default.readFileSync(filePath, 'utf8');
    // User email
    mailer_1.transporter.sendMail({
        from: 'bussineswebpage@gmail.com',
        to: `${req.body.email}`,
        subject: `${req.body.subject} 👻👻`,
        text: 'Welcome, thank you for contacting us shortly we will contact you..',
        html: `${emailTemplate}`, // html body
    }).then(() => {
        console.log('send emails');
    }).catch(err => {
        console.log('Error in send emails');
        throw new Error('Error form, data incomplete');
    });
    // Admin email
    mailer_1.transporter.sendMail({
        from: `${req.body.email}`,
        to: 'bussineswebpage@gmail.com',
        subject: `${req.body.subject} 👻👻`,
        text: 'Welcome, thank you for contacting us shortly we will contact you',
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <head style="background-color:rgb(146, 125, 125);">
                <h1>Prospect client</h1>
            </head>
            <main>
                <section>
                    <h2>Data for prospect client</h2>
                    <ul>
                        <li><strong>NAME: </strong>${req.body.name}</li>
                        <li><strong>EMAIL: </strong>${req.body.email}</li>
                        <li><strong>PHONE: </strong>${req.body.phone}</li>
                        <li><strong>MESSAGE: </strong>${req.body.message}</li>
                    </ul>
                </section>
            </main>
        </body>
        </html>`, // html body
    }).then(() => {
        console.log('send emails');
    }).catch(err => {
        console.log('Error in send emails');
        throw new Error('Error form, data incomplete');
    });
};
exports.transporEmailFunction = transporEmailFunction;
