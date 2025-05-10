import express, { Request, Response } from 'express'
import { aboutCards, catalogCards, childCards, doctorCards, services } from '../service/about-service'
import { banner, mainPage } from '../service/main.page'

let router = express.Router()

router.get('/services', services)
    .get('/about-cards', aboutCards)
    .get('/catalog-cards', catalogCards)
    .get('/child-cards', childCards)
    .get('/doctor-cards', doctorCards)
    .get('/main', mainPage)
    .get('/banner', banner)
    

export default router