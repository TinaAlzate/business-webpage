import nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'valzate618@gmail.com',
        pass: 'holpukgrrruuevyg' // pass proporecionada por Google
    }
});

transporter.verify().then(()=>{
    console.log('ready for send mails');
});