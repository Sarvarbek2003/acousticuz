import express, { Request, Response } from 'express'
import { aboutCards, aboutCardsById, catalogCards, catalogCardsById, childCards, childCardsById, doctorCards, doctorCardsById, hearingTools, hearingToolsById, services, servicesById } from '../service/about-service'
import { banner, mainPage } from '../service/main.page'

let router = express.Router()

router.get('/services', services)
    .get('/services/:id', servicesById)
    .get('/about-cards', aboutCards)
    .get('/about-cards/:id', aboutCardsById)
    .get('/catalog-cards', catalogCards)
    .get('/catalog-cards/:id', catalogCardsById)
    .get('/child-cards', childCards)
    .get('/child-cards/:id', childCardsById)
    .get('/doctor-cards', doctorCards)
    .get('/doctor-cards/:id', doctorCardsById)
    .get('/hearing-tool', hearingTools)
    .get('/hearing-tool/:id', hearingToolsById)
    .get('/main', mainPage)
    .get('/banner', banner)
    

export default router