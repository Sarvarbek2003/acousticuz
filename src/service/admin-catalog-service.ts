import { Request, Response, NextFunction } from "express";
import { readFileSync, rmSync, writeFileSync } from "fs";
import { join } from "path";
import { ClientError } from "../utils/error.handle";
import { CreateDoctorDto } from "./dto/doctor.cards.dto";
import { ParamId } from "./dto/services.dto";
import { CreateCatalogCardsDto, UpdateCatalogCardsDto } from "./dto/catalog.cards.dto";

const addCatalogCard = (req: Request, res: Response, next: NextFunction) => {
    const {
        link,
        img,
        textKey,
        titleKey
    } = req.body as CreateCatalogCardsDto

    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let result_ru = JSON.parse(readFileSync(join(process.cwd(), 'database', 'catalogcards', `ru.json`), 'utf-8'))

        result_ru.push({
            id: result_ru.at(-1).id ? result_ru.at(-1).id + 1 : 1,
            link: link,
            img: img,
            titleKey: titleKey['ru'],
            textKey: textKey['ru'],
        })
        let result_uz = JSON.parse(readFileSync(join(process.cwd(), 'database', 'catalogcards', `uz.json`), 'utf-8'))

        result_uz.push({
            id: result_uz.at(-1).id ? result_uz.at(-1).id + 1 : 1,
            link: link,
            img: img,
            titleKey: titleKey['uz'],
            textKey: textKey['uz'],
        })

        writeFileSync(join(process.cwd(), 'database', 'catalogcards', `ru.json`), JSON.stringify(result_ru, null, 4))
        writeFileSync(join(process.cwd(), 'database', 'catalogcards', `uz.json`), JSON.stringify(result_uz, null, 4))

        res.status(201).json({ message: "Successfully" })
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}

const updateCatalogCard = (req: Request, res: Response, next: NextFunction) => {
    const {
        link,
        img,
        titleKey,
        textKey
    } = req.body as UpdateCatalogCardsDto

    const { id } = req.params as unknown as ParamId

    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let result_ru = JSON.parse(readFileSync(join(process.cwd(), 'database', 'catalogcards', `ru.json`), 'utf-8'))
        let result_uz = JSON.parse(readFileSync(join(process.cwd(), 'database', 'catalogcards', `uz.json`), 'utf-8'))

        result_ru.map(el => {
            if(el.id == id) {
                el.img = (img ? img : el.img),
                el.titleKey = (titleKey ? titleKey['ru'] : el.titleKey)
                el.textKey = (textKey ? textKey['ru'] : el.textKey)
                el.link = (link ? link : el.link)
            }
        })
        result_uz.map(el => {
            if(el.id == id) {
                el.img = (img ? img : el.img),
                el.titleKey = (titleKey ? titleKey['uz'] : el.titleKey)
                el.textKey = (textKey ? textKey['uz'] : el.textKey)
                el.link = (link ? link : el.link)
            }
        })

        writeFileSync(join(process.cwd(), 'database', 'catalogcards', `ru.json`), JSON.stringify(result_ru, null, 4))
        writeFileSync(join(process.cwd(), 'database', 'catalogcards', `uz.json`), JSON.stringify(result_uz, null, 4))

        res.status(200).json({ message: "Successfully" })
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}

const deleteCatalogCard = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as unknown as ParamId

    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let result_ru = JSON.parse(readFileSync(join(process.cwd(), 'database', 'catalogcards', `ru.json`), 'utf-8'))
        let result_uz = JSON.parse(readFileSync(join(process.cwd(), 'database', 'catalogcards', `uz.json`), 'utf-8'))

        result_ru = result_ru.filter(el => el.id != id);
        result_uz = result_uz.filter(el => el.id != id);

        writeFileSync(join(process.cwd(), 'database', 'catalogcards', `ru.json`), JSON.stringify(result_ru, null, 4))
        writeFileSync(join(process.cwd(), 'database', 'catalogcards', `uz.json`), JSON.stringify(result_uz, null, 4))

        res.status(200).json({ message: "Successfully" })
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}


export {
    addCatalogCard,
    updateCatalogCard,
    deleteCatalogCard
}