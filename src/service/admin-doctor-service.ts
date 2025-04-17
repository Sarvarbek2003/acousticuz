import { Request, Response, NextFunction } from "express";
import { readFileSync, rmSync, writeFileSync } from "fs";
import { join } from "path";
import { ClientError } from "../utils/error.handle";
import { CreateDoctorDto } from "./dto/doctor.cards.dto";
import { ParamId } from "./dto/services.dto";

const addDoctorCard = (req: Request, res: Response, next: NextFunction) => {
    const {
        link,
        img,
        doctorsName,
        aboutDoctor,
        experience
    } = req.body as CreateDoctorDto

    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let result_ru = JSON.parse(readFileSync(join(process.cwd(), 'database', 'doctor_cards', `ru.json`), 'utf-8'))

        result_ru.push({
            id: result_ru.at(-1).id ? result_ru.at(-1).id + 1 : 1,
            link: link,
            img: img,
            doctorsName: doctorsName['ru'],
            aboutDoctor: aboutDoctor['ru'],
            experience: experience['ru']
        })
        let result_uz = JSON.parse(readFileSync(join(process.cwd(), 'database', 'doctor_cards', `uz.json`), 'utf-8'))

        result_uz.push({
            id: result_uz.at(-1).id ? result_uz.at(-1).id + 1 : 1,
            link: link,
            img: img,
            doctorsName: doctorsName['uz'],
            aboutDoctor: aboutDoctor['uz'],
            experience: experience['uz']
        })

        writeFileSync(join(process.cwd(), 'database', 'doctor_cards', `ru.json`), JSON.stringify(result_ru, null, 4))
        writeFileSync(join(process.cwd(), 'database', 'doctor_cards', `uz.json`), JSON.stringify(result_uz, null, 4))

        res.status(201).json({ message: "Successfully" })
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}

const updateDoctorCard = (req: Request, res: Response, next: NextFunction) => {
    const {
        link,
        img,
        doctorsName,
        aboutDoctor,
        experience
    } = req.body as CreateDoctorDto

    const { id } = req.params as unknown as ParamId

    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let result_ru = JSON.parse(readFileSync(join(process.cwd(), 'database', 'doctor_cards', `ru.json`), 'utf-8'))
        let result_uz = JSON.parse(readFileSync(join(process.cwd(), 'database', 'doctor_cards', `uz.json`), 'utf-8'))

        result_ru.map(el => {
            if(el.id == id) {
                el.img = (img ? img : el.img),
                el.doctorsName = (doctorsName ? doctorsName['ru'] : el.doctorsName)
                el.aboutDoctor = (aboutDoctor ? aboutDoctor['ru'] : el.aboutDoctor)
                el.aboutDoctor = (experience ? experience['ru'] : el.experience)
                el.link = (link ? link : el.link)
            }
        })
        result_uz.map(el => {
            if(el.id == id) {
                el.img = (img ? img : el.img),
                el.doctorsName = (doctorsName ? doctorsName['uz'] : el.doctorsName)
                el.aboutDoctor = (aboutDoctor ? aboutDoctor['uz'] : el.aboutDoctor)
                el.aboutDoctor = (experience ? experience['uz'] : el.experience)
                el.link = (link ? link : el.link)
            }
        })

        writeFileSync(join(process.cwd(), 'database', 'doctor_cards', `ru.json`), JSON.stringify(result_ru, null, 4))
        writeFileSync(join(process.cwd(), 'database', 'doctor_cards', `uz.json`), JSON.stringify(result_uz, null, 4))

        res.status(200).json({ message: "Successfully" })
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}

const deleteDoctorCard = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as unknown as ParamId

    try {
        let lang = ['ru', 'uz'].includes(req.headers['accept-language']) ? req.headers['accept-language'] : 'ru'
        let result_ru = JSON.parse(readFileSync(join(process.cwd(), 'database', 'doctor_cards', `ru.json`), 'utf-8'))
        let result_uz = JSON.parse(readFileSync(join(process.cwd(), 'database', 'doctor_cards', `uz.json`), 'utf-8'))

        result_ru = result_ru.filter(el => el.id != id);
        result_uz = result_uz.filter(el => el.id != id);

        writeFileSync(join(process.cwd(), 'database', 'doctor_cards', `ru.json`), JSON.stringify(result_ru, null, 4))
        writeFileSync(join(process.cwd(), 'database', 'doctor_cards', `uz.json`), JSON.stringify(result_uz, null, 4))

        res.status(200).json({ message: "Successfully" })
    } catch (error) {
        next(new ClientError(error.message, 403))
    }
}


export {
    addDoctorCard,
    updateDoctorCard,
    deleteDoctorCard
}