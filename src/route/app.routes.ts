import express, { Request, Response } from 'express'
import { aboutCards, catalogCards, childCards, doctorCards, services } from '../service/about-service'

let router = express.Router()

router.get('/services', services)
    .get('/about-cards', aboutCards)
    .get('/catalog-cards', catalogCards)
    .get('/child-cards', childCards)
    .get('/doctor-cards', doctorCards)
    

export default router