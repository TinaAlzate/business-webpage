
import { Request, Response } from "express";


import express, { Application } from 'express';
import routerUserForm from '../routes/userForm';
import cors from 'cors';

export class Server {
    private app: Application;
    private port : string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3003'; // PORT server.
        // Esta función debe de estar inicializada antes que el método de la route, transforma la req.body a un json
        this.midlewares();
        this.listen();
        this.routes();
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en el puesto', this.port);
        });
    }

    routes(){
        // Configuración del cors ya que al correr en puertos diferentes, se crea un bloqueo de seguridad.
        // this.app.use(cors({
        //     origin: 'http://127.0.0.1:5500',
        //     methods: ['GET', 'POST'],
        // }));
        this.app.use(cors()); // Cualquier tipo de sitio.
        this.app.use('/api/userform', routerUserForm);
    }

    // ! Indispensable para leer JSON (Method: POST, UPDATE, DELETE)
    /**
     * Función para parciar el json
     */
    midlewares(){
        this.app.use(express.json());
    }
}