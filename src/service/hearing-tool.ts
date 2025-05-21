import { Request, Response, NextFunction } from "express";
import { readFileSync, rmSync, writeFileSync } from "fs";
import { join } from "path";
import { ClientError } from "../utils/error.handle";
import { CreateDoctorDto } from "./dto/doctor.cards.dto";
import { ParamId } from "./dto/services.dto";
import { CreateCatalogCardsDto, UpdateCatalogCardsDto } from "./dto/catalog.cards.dto";
import { CreateHearingToolDto, UpdateHearingToolDto } from "./dto/hearing.tool";

const getHearingTool = (req: Request, res: Response, next: NextFunction) => {
    try {
        let { id } = req.params as unknown as ParamId
        let result_uz = JSON.parse(readFileSync(join(process.cwd(), 'database', 'hearing_tools', `ru.json`), 'utf-8'))
        let result_ru = JSON.parse(readFileSync(join(process.cwd(), 'database', 'hearing_tools', `uz.json`), 'utf-8'))
        result_uz = result_uz.find(el => el.id == id)
        result_ru = result_ru.find(el => el.id == id)


        res.status(200).json({
            ...result_uz,
            name:{
                uz: result_uz.name,
                ru: result_ru.name
            },
            description: {
                uz: result_uz.description,
                ru: result_ru.description
            }
        })
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}


const addHearingTool = (req: Request, res: Response, next: NextFunction) => {
    const {
        img,
        description,
        inCash,
        madein,
        name,
        price,
        company_id
    } = req.body as CreateHearingToolDto

    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let result_ru = JSON.parse(readFileSync(join(process.cwd(), 'database', 'hearing_tools', `ru.json`), 'utf-8'))

        result_ru.push({
            id: result_ru.at(-1).id ? result_ru.at(-1).id + 1 : 1,
            img: img,
            inCash,
            madein, 
            price,
            company_id: company_id,
            name: name['ru'],
            description: description['ru']
            
        })
        let result_uz = JSON.parse(readFileSync(join(process.cwd(), 'database', 'hearing_tools', `uz.json`), 'utf-8'))

        result_uz.push({
            id: result_uz.at(-1).id ? result_uz.at(-1).id + 1 : 1,
            img: img,
            inCash,
            madein, 
            price,
            name: name['uz'],
            company_id: company_id,
            description: description['uz']
        })

        writeFileSync(join(process.cwd(), 'database', 'hearing_tools', `ru.json`), JSON.stringify(result_ru, null, 4))
        writeFileSync(join(process.cwd(), 'database', 'hearing_tools', `uz.json`), JSON.stringify(result_uz, null, 4))

        res.status(201).json({ message: "Successfully" })
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}

const updateHearingTool = (req: Request, res: Response, next: NextFunction) => {
    const {
        img,
        inCash,
        madein,
        name,
        price,
        description,
        company_id
    } = req.body as UpdateHearingToolDto

    const { id } = req.params as unknown as ParamId

    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let result_ru = JSON.parse(readFileSync(join(process.cwd(), 'database', 'hearing_tools', `ru.json`), 'utf-8'))
        let result_uz = JSON.parse(readFileSync(join(process.cwd(), 'database', 'hearing_tools', `uz.json`), 'utf-8'))

        result_ru.map(el => {
            if(el.id == id) {
                el.img = (img ? img : el.img),
                el.inCash = (inCash ? inCash : el.inCash)
                el.madein = (madein ? madein : el.madein)
                el.name = (name ? name['ru'] : el.name)
                el.price = (price ? price : el.price)
                el.company_id = (company_id ? company_id : el.company_id)
                el.description = (description ? description['ru'] : el.description)
            }
        })
        result_uz.map(el => {
            if(el.id == id) {
                el.img = (img ? img : el.img),
                el.inCash = (inCash ? inCash : el.inCash)
                el.madein = (madein ? madein : el.madein)
                el.name = (name ? name['uz'] : el.name)
                el.price = (price ? price : el.price)
                el.company_id = (company_id ? company_id : el.company_id)
                el.description = (description ? description['uz'] : el.description)
            }
        })

        writeFileSync(join(process.cwd(), 'database', 'hearing_tools', `ru.json`), JSON.stringify(result_ru, null, 4))
        writeFileSync(join(process.cwd(), 'database', 'hearing_tools', `uz.json`), JSON.stringify(result_uz, null, 4))

        res.status(200).json({ message: "Successfully" })
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}

const deleteHearingTool = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as unknown as ParamId

    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let result_ru = JSON.parse(readFileSync(join(process.cwd(), 'database', 'hearing_tools', `ru.json`), 'utf-8'))
        let result_uz = JSON.parse(readFileSync(join(process.cwd(), 'database', 'hearing_tools', `uz.json`), 'utf-8'))

        result_ru = result_ru.filter(el => el.id != id);
        result_uz = result_uz.filter(el => el.id != id);

        writeFileSync(join(process.cwd(), 'database', 'hearing_tools', `ru.json`), JSON.stringify(result_ru, null, 4))
        writeFileSync(join(process.cwd(), 'database', 'hearing_tools', `uz.json`), JSON.stringify(result_uz, null, 4))

        res.status(200).json({ message: "Successfully" })
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}


export {
    getHearingTool,
    addHearingTool,
    updateHearingTool,
    deleteHearingTool
}