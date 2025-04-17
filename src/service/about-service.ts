import { NextFunction, Request, Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ClientError } from '../utils/error.handle';


const services = (req: Request, res: Response, next: NextFunction) => {
    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let result = JSON.parse(readFileSync(join(process.cwd(), 'database', 'services', `${lang}.json`), 'utf-8'))
        res.status(200).json(result)
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}

const aboutCards = (req: Request, res: Response, next: NextFunction) => {
    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let result = JSON.parse(readFileSync(join(process.cwd(), 'database', 'aboutcards', `${lang}.json`), 'utf-8'))
        res.status(200).json(result)
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}

const childCards = (req: Request, res: Response, next: NextFunction) => {
    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let result = JSON.parse(readFileSync(join(process.cwd(), 'database', 'child_cards', `${lang}.json`), 'utf-8'))
        res.status(200).json(result)
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}

const doctorCards = (req: Request, res: Response, next: NextFunction) => {
    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let result = JSON.parse(readFileSync(join(process.cwd(), 'database', 'doctor_cards', `${lang}.json`), 'utf-8'))
        res.status(200).json(result)
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}

const catalogCards = (req: Request, res: Response, next: NextFunction) => {
    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let result = JSON.parse(readFileSync(join(process.cwd(), 'database', 'catalogcards', `${lang}.json`), 'utf-8'))
        res.status(200).json(result)
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}

export {
    catalogCards,
    services, 
    doctorCards,
    childCards,
    aboutCards
}