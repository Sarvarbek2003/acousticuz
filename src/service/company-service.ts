import { Request, Response, NextFunction } from "express";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { ClientError } from "../utils/error.handle";
import { ParamId } from "./dto/services.dto";
import { CreateCompanyDto, UpdateCompanyDto } from "./dto/company.dto";

const getCompany = (req: Request, res: Response, next: NextFunction) => {
    try {
        let { id } = req.params as unknown as ParamId
        let result_uz = JSON.parse(readFileSync(join(process.cwd(), 'database', 'company', `uz.json`), 'utf-8'))
        let result_ru = JSON.parse(readFileSync(join(process.cwd(), 'database', 'company', `ru.json`), 'utf-8'))
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
            },
            post: {
                uz: result_uz.post,
                ru: result_ru.post
            }
        })
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}


const addCompany = (req: Request, res: Response, next: NextFunction) => {
    const {
        img,
        description,
        name,
        img_post,
        phone,
        main,
        post
    } = req.body as CreateCompanyDto

    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let result_ru = JSON.parse(readFileSync(join(process.cwd(), 'database', 'company', `ru.json`), 'utf-8'))

        result_ru.push({
            id: result_ru.at(-1).id ? result_ru.at(-1).id + 1 : 1,
            img: img,
            name: name['ru'],
            description: description['ru'],
            img_post: img_post['ru'],
            phone: phone,
            main: main,
            post: post['ru']
        })
        let result_uz = JSON.parse(readFileSync(join(process.cwd(), 'database', 'company', `uz.json`), 'utf-8'))

        result_uz.push({
            id: result_uz.at(-1).id ? result_uz.at(-1).id + 1 : 1,
            img: img,
            name: name['uz'],
            description: description['uz'],
            img_post: img_post['uz'],
            phone: phone,
            main: main,
            post: post['uz']
        })

        writeFileSync(join(process.cwd(), 'database', 'company', `ru.json`), JSON.stringify(result_ru, null, 4))
        writeFileSync(join(process.cwd(), 'database', 'company', `uz.json`), JSON.stringify(result_uz, null, 4))

        res.status(201).json({ message: "Successfully" })
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}

const updateCompany = (req: Request, res: Response, next: NextFunction) => {
    const {
        img,
        name,
        description,
        img_post,
        phone,
        main,
        post
    } = req.body as UpdateCompanyDto

    const { id } = req.params as unknown as ParamId

    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let result_ru = JSON.parse(readFileSync(join(process.cwd(), 'database', 'company', `ru.json`), 'utf-8'))
        let result_uz = JSON.parse(readFileSync(join(process.cwd(), 'database', 'company', `uz.json`), 'utf-8'))

        result_ru.map(el => {
            if(el.id == id) {
                el.img = (img ? img : el.img),
                el.name = (name ? name['ru'] : el.name)
                el.post = (post ? post['ru'] : el.post)
                el.img_post = (img_post ? img_post['ru'] : el.img_post)
                el.phone = (phone ? phone : el.phone)
                el.main = (main ? main : el.main)
                el.description = (description ? description['ru'] : el.description)
            }
        })
        result_uz.map(el => {
            if(el.id == id) {
                el.img = (img ? img : el.img),
                el.name = (name ? name['uz'] : el.name)
                el.post = (post ? post['uz'] : el.post)
                el.img_post = (img_post ? img_post['uz'] : el.img_post)
                el.phone = (phone ? phone : el.phone)
                el.main = (main ? main : el.main)
                el.description = (description ? description['uz'] : el.description)
            }
        })

        writeFileSync(join(process.cwd(), 'database', 'company', `ru.json`), JSON.stringify(result_ru, null, 4))
        writeFileSync(join(process.cwd(), 'database', 'company', `uz.json`), JSON.stringify(result_uz, null, 4))

        res.status(200).json({ message: "Successfully" })
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}

const deleteCompany = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as unknown as ParamId

    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let result_ru = JSON.parse(readFileSync(join(process.cwd(), 'database', 'company', `ru.json`), 'utf-8'))
        let result_uz = JSON.parse(readFileSync(join(process.cwd(), 'database', 'company', `uz.json`), 'utf-8'))

        result_ru = result_ru.filter(el => el.id != id);
        result_uz = result_uz.filter(el => el.id != id);

        writeFileSync(join(process.cwd(), 'database', 'company', `ru.json`), JSON.stringify(result_ru, null, 4))
        writeFileSync(join(process.cwd(), 'database', 'company', `uz.json`), JSON.stringify(result_uz, null, 4))

        res.status(200).json({ message: "Successfully" })
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}


export {
    getCompany,
    addCompany,
    updateCompany,
    deleteCompany,
}