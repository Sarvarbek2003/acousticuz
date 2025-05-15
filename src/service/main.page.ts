import { NextFunction, Request, Response } from 'express';
import { link, readFileSync } from 'fs';
import { join } from 'path';
import { ClientError } from '../utils/error.handle';

const services_dictonary = { ru: 'Наши услуги', uz: 'Bizning xizmatlarimiz' }
const child_dictonary = { ru: 'Дети и слух', uz: 'Bolalar eshitish vositalari' }
const catalog_dictonary = { ru: 'Каталог', uz: 'Katalog' }
const mission_dictonary = { ru: 'Наша миссия', uz: 'Bizning vazifamiz' }

const mainPage = (req: Request, res: Response, next: NextFunction) => {
    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let services: any[] = JSON.parse(readFileSync(join(process.cwd(), 'database', 'services', `${lang}.json`), 'utf-8'))
        let child_cards: any[] = JSON.parse(readFileSync(join(process.cwd(), 'database', 'child_cards', `${lang}.json`), 'utf-8'))
        let category_cards: any[] = JSON.parse(readFileSync(join(process.cwd(), 'database', 'child_cards', `${lang}.json`), 'utf-8'))
        let about_cards: any[] = JSON.parse(readFileSync(join(process.cwd(), 'database', 'child_cards', `${lang}.json`), 'utf-8'))

        let mainservices = services.filter(el => el.main)
        let mainchild_cards = child_cards.filter(el => el.main)
        let mainabout_cards = about_cards.filter(el => el.main)
        let maincategory_cards = category_cards.filter(el => el.main)
        let mainPage = []

        mainPage.push({
            title: services_dictonary[lang],
            layout: 'vertical',
            link: 'services',
            data: mainservices.map(el => ({ id: el.id, title: el.title, description: el.text, image: el.img }))
        })

        mainPage.push({
            title: child_dictonary[lang],
            layout: 'horizontal',
            link: 'child',
            data: mainchild_cards.map(el => ({ id: el.id, title: el.title, description: el.text, image: el.img }))
        })

        mainPage.push({
            title: catalog_dictonary[lang],
            layout: 'horizontal',
            link:'catalog',
            data: maincategory_cards.map(el => ({ id: el.id, title: el.title, description: el.text, image: el.img }))
        })

        mainPage.push({
            title: mission_dictonary[lang],
            layout: 'vertical',
            link:'about',
            data: mainabout_cards.map(el => ({ id: el.id, title: el.title, description: el.text, image: el.img }))
        })


        res.status(200).json(mainPage)
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}

const banner = (req: Request, res: Response, next: NextFunction) => {
    let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
    let banner: any[] = JSON.parse(readFileSync(join(process.cwd(), 'database', 'banner', `${lang}.json`), 'utf-8'))
    try {
        res.status(200).json(banner)
    } catch (error) {
        next(new ClientError(error.message, 403))
    }

}

export {
    mainPage, banner
}