import express, { Request, Response } from 'express'
import { aboutCards, catalogCards, childCards, doctorCards, services } from '../service/about-service'
import { addService, deleteService, getService, updateService } from '../service/admin-services-service'
import { validateRequest } from '../utils/validate'
import { addAboutCards, deleteAboutCards, getAboutCard, updateAboutCards } from '../service/admin-aboutcards-service'
import { addChildCard, deleteChildCard, getChildCard, updateChildCard } from '../service/admin-childcards-service'
import { addDoctorCard, deleteDoctorCard, getDoctorCard, updateDoctorCard } from '../service/admin-doctor-service'
import { addCatalogCard, deleteCatalogCard, getCatalogCard, updateCatalogCard } from '../service/admin-catalog-service'
import { addHearingTool, deleteHearingTool, getHearingTool, updateHearingTool } from '../service/hearing-tool'

let router = express.Router()

router.post('/services', validateRequest, addService)
    .get('/services/:id',validateRequest, getService)
    .put('/services/:id',validateRequest, updateService)
    .delete('/services/:id', validateRequest, deleteService)

    .post('/child-cards', validateRequest, addChildCard)
    .get('/child-cards/:id', validateRequest, getChildCard)
    .put('/child-cards/:id', validateRequest, updateChildCard)
    .delete('/child-cards/:id', validateRequest, deleteChildCard)

    .post('/doctor-cards', validateRequest, addDoctorCard)
    .get('/doctor-cards/:id', validateRequest, getDoctorCard)
    .put('/doctor-cards/:id', validateRequest, updateDoctorCard)
    .delete('/doctor-cards/:id', validateRequest, deleteDoctorCard)

    .post('/about-cards', validateRequest, addAboutCards)
    .get('/about-cards/:id', validateRequest, getAboutCard)
    .put('/about-cards/:id', validateRequest, updateAboutCards)
    .delete('/about-cards/:id', validateRequest, deleteAboutCards)

    .post('/catalog-cards', validateRequest, addCatalogCard)
    .get('/catalog-cards/:id', validateRequest, getCatalogCard)
    .put('/catalog-cards/:id', validateRequest, updateCatalogCard)
    .delete('/catalog-cards/:id', validateRequest, deleteCatalogCard)

    .post('/hearing-tool', validateRequest, addHearingTool)
    .put('/hearing-tool/:id', validateRequest, getHearingTool)
    .put('/hearing-tool/:id', validateRequest, updateHearingTool)
    .delete('/hearing-tool/:id', validateRequest, deleteHearingTool)
    

export default router