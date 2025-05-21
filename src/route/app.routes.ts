import express, { Request, Response } from 'express'
import { aboutCards, aboutCardsById, catalogCards, catalogCardsById, childCards, childCardsById, company, companyById, doctorCards, doctorCardsById, hearingTools, hearingToolsByCompantId, hearingToolsById, services, servicesById } from '../service/about-service'
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
    .get('/company', company)
    .get('/company/:id', companyById)
    .get('/hearing-tool', hearingTools)
    .get('/company/:id/hearing-tool', hearingToolsByCompantId)
    .get('/hearing-tool/:id', hearingToolsById)
    .get('/main', mainPage)
    .get('/banner', banner)
    

export default router