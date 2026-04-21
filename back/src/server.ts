import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/indexRouter';
import { FRONTEND_URL } from './config/env';

const server: Application  = express();

server.use(cors({ origin: FRONTEND_URL, credentials: true }));

server.use(express.json());
server.use(morgan('dev'));


server.use(router);

export default server;
