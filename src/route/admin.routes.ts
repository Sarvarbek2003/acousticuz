import express, { Request, Response } from 'express'
import { aboutCards, catalogCards, childCards, doctorCards, services } from '../service/about-service'
import { addService, deleteService, updateService } from '../service/admin-services-service'
import { validateRequest } from '../utils/validate'
import { addAboutCards, deleteAboutCards, updateAboutCards } from '../service/admin-aboutcards-service'
import { addChildCard, deleteChildCard, updateChildCard } from '../service/admin-childcards-service'
import { addDoctorCard, deleteDoctorCard, updateDoctorCard } from '../service/admin-doctor-service'
import { addCatalogCard, deleteCatalogCard, updateCatalogCard } from '../service/admin-catalog-service'

let router = express.Router()

router.post('/services', validateRequest, addService)
    .put('/services/:id',validateRequest, updateService)
    .delete('/services/:id', validateRequest, deleteService)

    .post('/child-cards', validateRequest, addChildCard)
    .put('/child-cards/:id', validateRequest, updateChildCard)
    .delete('/child-cards/:id', validateRequest, deleteChildCard)

    .post('/doctor-cards', validateRequest, addDoctorCard)
    .put('/doctor-cards/:id', validateRequest, updateDoctorCard)
    .delete('/doctor-cards/:id', validateRequest, deleteDoctorCard)

    .post('about-cards', validateRequest, addAboutCards)
    .put('about-cards/:id', validateRequest, updateAboutCards)
    .delete('about-cards/:id', validateRequest, deleteAboutCards)

    .post('catalog-cards', validateRequest, addCatalogCard)
    .put('catalog-cards/:id', validateRequest, updateCatalogCard)
    .delete('catalog-cards/:id', validateRequest, deleteCatalogCard)
    

export default router