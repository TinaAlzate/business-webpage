
import { transporter } from "../config/mailer";
import { Request } from "express";
import fs from 'fs';
import path from 'path';

export const  transporEmailFunction = (req: Request)=>{
    // Ruta de template email (HTML)..
    const filePath = path.join(__dirname,'..', 'views', 'sendEmail.html');
    const emailTemplate = fs.readFileSync(filePath, 'utf8');
     // User email
    transporter.sendMail({
        from: 'bussineswebpage@gmail.com',
        to: `${req.body.email}`,
        subject: `${req.body.subject} 👻👻` ,
        text: 'Welcome, thank you for contacting us shortly we will contact you..',
        html: `${ emailTemplate }`, // html body
    }).then(() => {
        console.log('send emails');
    }).catch(err => {
        console.log('Error in send emails');
        throw new Error('Error form, data incomplete');
    });
    // Admin email
    transporter.sendMail({
        from: `${ req.body.email }`,
        to: 'bussineswebpage@gmail.com',
        subject: `${ req.body.subject } 👻👻` ,
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
                        <li><strong>NAME: </strong>${ req.body.name }</li>
                        <li><strong>EMAIL: </strong>${req.body.email }</li>
                        <li><strong>PHONE: </strong>${ req.body.phone }</li>
                        <li><strong>MESSAGE: </strong>${ req.body.message }</li>
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
}