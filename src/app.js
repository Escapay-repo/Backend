import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import routes from './routes.js';
import AuthMiddleware from "./middlewares/authMiddleware.js";
import dotenv from 'dotenv';

dotenv.config()

class App {

    constructor() {
        this.server = express();
        mongoose.connect(process.env.MONGO_URI);
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use('*', cors({
            origin: 'https://escapaybank-integracoes.com.br',
            // origin: 'http://localhost:4200',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        }));
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(AuthMiddleware.authenticateToken);
    }

    routes() {
        this.server.use(routes);
    }
}
export default new App().server;