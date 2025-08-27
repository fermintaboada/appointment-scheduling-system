import express, { Application } from 'express';
import morgan from 'morgan';
import router from './routes/indexRouter';

const server: Application  = express();

server.use(express.json());
server.use(morgan('dev')); 


server.use(router);

export default server;
