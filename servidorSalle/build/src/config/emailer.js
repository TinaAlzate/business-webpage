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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = () => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'valzate618@gmail.com',
            pass: 'holpukgrrruuevyg' // pass proporecionada por Google
        }
    };
    const mensaje = {
        from: 'valzate618@gmail.com',
        to: 'jarestrepot@uqvirtual.edu.co',
        subject: 'Hello ✔',
        text: 'Hello world?',
        html: '<h2>Hola amor</h2>', // html body
    };
    const transport = nodemailer_1.default.createTransport(config);
    const info = yield transport.sendMail(mensaje);
    console.log(info);
});
exports.default = sendMail;
