import express, { NextFunction, Request, Response } from 'express'
import path from 'path'
import cors from 'cors'
import 'reflect-metadata';
import { ClientError } from './utils/error.handle'
import service from './route/app.routes'
import admin from './route/admin.routes'
import * as dotenv from 'dotenv'
dotenv.config();
 
const app = express()
app.use(cors()) // Enable CORS
app.use(express.json())   
app.use(express.json())   
app.use(express.static(path.join(process.cwd(), 'files')))


app.use('/api', service)
app.use('/admin/', admin)

app.use((err: ClientError, req: Request, res: Response, next: NextFunction):any => {
    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';    
    return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        error: err.error ?? {},
        status: err.status,
        message: err.statusCode == 500 ? "Internal Server Error" : err.message
    });
});

process.on('unhandledRejection', (err: any) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err);
    process.exit()
});

app.listen(3000)
