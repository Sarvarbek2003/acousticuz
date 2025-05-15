import express, { NextFunction, Request, Response } from 'express'

// Extend the Request interface to include the 'file' property
declare global {
    namespace Express {
        interface Request {
            file?: import('multer').File;
        }
    }
}
import path from 'path'
import cors from 'cors'
import 'reflect-metadata';
import { ClientError } from './utils/error.handle'
import service from './route/app.routes'
import admin from './route/admin.routes'
import * as dotenv from 'dotenv'
import multer from 'multer';
dotenv.config();
 
const app = express()
app.use(cors()) // Enable CORS
app.use(express.json())   
app.use(express.json())   
app.use(express.static(path.join(process.cwd(), 'files')))

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), 'files/images')); // Set upload directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Generate unique file name
    },
});

const upload = multer({ storage });

// File upload endpoint
app.post('/upload', upload.single('file'), (req: Request, res: Response): any => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    req.file.path = req.file.path.replace('/home/acoustic/files', process.env.STORAGE_URL)
    res.status(200).json({
        message: 'File uploaded successfully',
        file: req.file,
    });
});


app.use('/api', service)
app.use('/admin/', admin)

app.use((err: ClientError, req: Request, res: Response, next?: NextFunction):any => {
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
