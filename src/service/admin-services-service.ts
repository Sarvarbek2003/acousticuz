import { Request, Response, NextFunction } from "express";
import { readFileSync, rmSync, writeFileSync } from "fs";
import { join } from "path";
import { ClientError } from "../utils/error.handle";
import { ParamId } from "./dto/services.dto";

const getService = (req: Request, res: Response, next: NextFunction) => {
    try {
        let { id } = req.params as unknown as ParamId
        let result_uz = JSON.parse(readFileSync(join(process.cwd(), 'database', 'services', `ru.json`), 'utf-8'))
        let result_ru = JSON.parse(readFileSync(join(process.cwd(), 'database', 'services', `uz.json`), 'utf-8'))
        result_uz = result_uz.find(el => el.id == id)
        result_ru = result_ru.find(el => el.id == id)


        res.status(200).json({
            ...result_uz,
            title:{
                uz: result_uz.title,
                ru: result_ru.title
            },
            text: {
                uz: result_uz.text,
                ru: result_ru.text
            },
            post: {
                uz: result_uz.text,
                ru: result_ru.text
            }
        })
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}

const addService = (req: Request, res: Response, next: NextFunction) => {
    const {
        link,
        img,
        title,
        text,
        img_post,
        post
    } = req.body

    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let result_ru = JSON.parse(readFileSync(join(process.cwd(), 'database', 'services', `ru.json`), 'utf-8'))

        result_ru.push({
            id: result_ru.at(-1).id ? result_ru.at(-1).id + 1 : 1,
            link: link,
            img: img,
            img_post: img_post,
            post: post['ru'],
            title: title['ru'],
            text: text['ru']
        })
        let result_uz = JSON.parse(readFileSync(join(process.cwd(), 'database', 'services', `uz.json`), 'utf-8'))

        result_uz.push({
            id: result_uz.at(-1).id ? result_uz.at(-1).id + 1 : 1,
            link: link,
            img: img,
            img_post: img_post,
            post: post['uz'],
            title: title['uz'],
            text: text['uz']
        })

        writeFileSync(join(process.cwd(), 'database', 'services', `ru.json`), JSON.stringify(result_ru, null, 4))
        writeFileSync(join(process.cwd(), 'database', 'services', `uz.json`), JSON.stringify(result_uz, null, 4))

        res.status(201).json({ message: "Successfully" })
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}

const updateService = (req: Request, res: Response, next: NextFunction) => {
    const {
        link,
        img,
        title,
        text,
        post,
        img_post
    } = req.body

    const { id } = req.params

    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let result_ru = JSON.parse(readFileSync(join(process.cwd(), 'database', 'services', `ru.json`), 'utf-8'))
        let result_uz = JSON.parse(readFileSync(join(process.cwd(), 'database', 'services', `uz.json`), 'utf-8'))

        result_ru.map(el => {
            if(el.id == id) {
                el.img = (img ? img : el.img),
                el.title = (title ? title['ru'] : el.title)
                el.text = (text ? text['ru'] : el.text)
                el.link = (link ? link : el.link)
                el.post = (post ? post['ru'] : el.post)
                el.img_post = (img_post ? img_post : el.img_post)
            }
        })
        result_uz.map(el => {
            if(el.id == id) {
                el.img = (img ? img : el.img),
                el.title = (title ? title['uz'] : el.title)
                el.text = (text ? text['uz'] : el.text)
                el.link = (link ? link : el.link)
                el.post = (post ? post['uz'] : el.post)
                el.img_post = (img_post ? img_post : el.img_post)
            }
        })

        writeFileSync(join(process.cwd(), 'database', 'services', `ru.json`), JSON.stringify(result_ru, null, 4))
        writeFileSync(join(process.cwd(), 'database', 'services', `uz.json`), JSON.stringify(result_uz, null, 4))

        res.status(200).json({ message: "Successfully" })
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}

const deleteService = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let result_ru = JSON.parse(readFileSync(join(process.cwd(), 'database', 'services', `ru.json`), 'utf-8'))
        let result_uz = JSON.parse(readFileSync(join(process.cwd(), 'database', 'services', `uz.json`), 'utf-8'))

        result_ru = result_ru.filter(el => el.id != id);
        result_uz = result_uz.filter(el => el.id != id);

        writeFileSync(join(process.cwd(), 'database', 'services', `ru.json`), JSON.stringify(result_ru, null, 4))
        writeFileSync(join(process.cwd(), 'database', 'services', `uz.json`), JSON.stringify(result_uz, null, 4))

        res.status(200).json({ message: "Successfully" })
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}


export {
    getService,
    addService,
    updateService,
    deleteService
}