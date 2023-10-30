"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const userForm_1 = __importDefault(require("../routes/userForm"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3003'; // PORT server.
        // Esta función debe de estar inicializada antes que el método de la route, transforma la req.body a un json
        this.midlewares();
        this.listen();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puesto', this.port);
        });
    }
    routes() {
        // Configuración del cors ya que al correr en puertos diferentes, se crea un bloqueo de seguridad.
        // this.app.use(cors({
        //     origin: 'http://127.0.0.1:5500',
        //     methods: ['GET', 'POST'],
        // }));
        this.app.use((0, cors_1.default)()); // Cualquier tipo de sitio.
        this.app.use('/api/userform', userForm_1.default);
    }
    // ! Indispensable para leer JSON (Method: POST, UPDATE, DELETE)
    /**
     * Función para parciar el json
     */
    midlewares() {
        this.app.use(express_1.default.json());
    }
}
exports.Server = Server;
