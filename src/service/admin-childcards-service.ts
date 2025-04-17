import { Request, Response, NextFunction } from "express";
import { readFileSync, rmSync, writeFileSync } from "fs";
import { join } from "path";
import { ClientError } from "../utils/error.handle";

const addChildCard = (req: Request, res: Response, next: NextFunction) => {
    const {
        link,
        img,
        title,
        text
    } = req.body

    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let result_ru = JSON.parse(readFileSync(join(process.cwd(), 'database', 'child_cards', `ru.json`), 'utf-8'))

        result_ru.push({
            id: result_ru.at(-1).id ? result_ru.at(-1).id + 1 : 1,
            link: link,
            img: img,
            title: title['ru'],
            text: text['ru']
        })
        let result_uz = JSON.parse(readFileSync(join(process.cwd(), 'database', 'child_cards', `uz.json`), 'utf-8'))

        result_uz.push({
            id: result_uz.at(-1).id ? result_uz.at(-1).id + 1 : 1,
            link: link,
            img: img,
            title: title['uz'],
            text: text['uz']
        })

        writeFileSync(join(process.cwd(), 'database', 'child_cards', `ru.json`), JSON.stringify(result_ru, null, 4))
        writeFileSync(join(process.cwd(), 'database', 'child_cards', `uz.json`), JSON.stringify(result_uz, null, 4))

        res.status(201).json({ message: "Successfully" })
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}

const updateChildCard = (req: Request, res: Response, next: NextFunction) => {
    const {
        link,
        img,
        title,
        text
    } = req.body

    const { id } = req.params

    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let result_ru = JSON.parse(readFileSync(join(process.cwd(), 'database', 'child_cards', `ru.json`), 'utf-8'))
        let result_uz = JSON.parse(readFileSync(join(process.cwd(), 'database', 'child_cards', `uz.json`), 'utf-8'))

        result_ru.map(el => {
            if(el.id == id) {
                el.img = (img ? img : el.img),
                el.title = (title ? title['ru'] : el.title)
                el.text = (text ? text['ru'] : el.text)
                el.link = (link ? link : el.link)
            }
        })
        result_uz.map(el => {
            if(el.id == id) {
                el.img = (img ? img : el.img),
                el.title = (title ? title['uz'] : el.title)
                el.text = (text ? text['uz'] : el.text)
                el.link = (link ? link : el.link)
            }
        })

        writeFileSync(join(process.cwd(), 'database', 'child_cards', `ru.json`), JSON.stringify(result_ru, null, 4))
        writeFileSync(join(process.cwd(), 'database', 'child_cards', `uz.json`), JSON.stringify(result_uz, null, 4))

        res.status(200).json({ message: "Successfully" })
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}

const deleteChildCard = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let result_ru = JSON.parse(readFileSync(join(process.cwd(), 'database', 'child_cards', `ru.json`), 'utf-8'))
        let result_uz = JSON.parse(readFileSync(join(process.cwd(), 'database', 'child_cards', `uz.json`), 'utf-8'))

        result_ru = result_ru.filter(el => el.id != id);
        result_uz = result_uz.filter(el => el.id != id);

        writeFileSync(join(process.cwd(), 'database', 'child_cards', `ru.json`), JSON.stringify(result_ru, null, 4))
        writeFileSync(join(process.cwd(), 'database', 'child_cards', `uz.json`), JSON.stringify(result_uz, null, 4))

        res.status(200).json({ message: "Successfully" })
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}


export {
    addChildCard,
    updateChildCard,
    deleteChildCard
}