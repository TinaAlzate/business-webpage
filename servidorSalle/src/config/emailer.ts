import nodemailer from 'nodemailer';

const sendMail = async () =>{
    const  config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'valzate618@gmail.com',
            pass: 'holpukgrrruuevyg' // pass proporecionada por Google
        }
    }

    const mensaje = {
        from: 'valzate618@gmail.com',
        to: 'jarestrepot@uqvirtual.edu.co',
        subject: 'Hello ✔',
        text: 'Hello world?',
        html: '<h2>Hola amor</h2>', // html body
    }

    const transport = nodemailer.createTransport(config);
    const info = await transport.sendMail(mensaje);

    console.log(info);
}

export default sendMail;