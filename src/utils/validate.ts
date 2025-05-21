import { plainToInstance } from 'class-transformer';
import { validate, validateSync } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { ClientError } from './error.handle';
import { CreateServiceDto, ParamId, UpdateServiceDto } from '../service/dto/services.dto';
import { CreateAboutCardsDto, UpdateAboutCardsDto } from '../service/dto/about.cards.dto';
import { CreateCatalogCardsDto, UpdateCatalogCardsDto } from '../service/dto/catalog.cards.dto';
import { CreateDoctorDto, UpdateDoctorDto } from '../service/dto/doctor.cards.dto';
import { CreateHearingToolDto, UpdateHearingToolDto } from '../service/dto/hearing.tool';
import { CreateCompanyDto, UpdateCompanyDto } from '../service/dto/company.dto';


const paths = {
    '/services-POST-body': CreateServiceDto,
    '/services/:id-PUT-body': UpdateServiceDto,
    '/services/:id-PUT-param': ParamId,
    '/services/:id-DELETE-param': ParamId,

    '/about-cards-POST-body': CreateAboutCardsDto,
    '/about-cards/:id-PUT-body': UpdateAboutCardsDto,
    '/about-cards/:id-PUT-param': ParamId,
    '/about-cards/:id-DELETE-param': ParamId,

    '/child-cards-POST-body': CreateServiceDto,
    '/child-cards/:id-PUT-body': UpdateServiceDto,
    '/child-cards/:id-PUT-param': ParamId,
    '/child-cards/:id-DELETE-param': ParamId,

    '/doctor-cards-POST-body': CreateDoctorDto,
    '/doctor-cards/:id-PUT-body': UpdateDoctorDto,
    '/doctor-cards/:id-PUT-param': ParamId,
    '/doctor-cards/:id-DELETE-param': ParamId,

    '/catalog-cards-POST-body': CreateCatalogCardsDto,
    '/catalog-cards/:id-PUT-body': UpdateCatalogCardsDto,
    '/catalog-cards/:id-PUT-param': ParamId,
    '/catalog-cards/:id-DELETE-param': ParamId,

    '/hearing-tools-POST-body': CreateHearingToolDto,
    '/hearing-tools/:id-PUT-body': UpdateHearingToolDto,
    '/hearing-tools/:id-PUT-param': ParamId,
    '/hearing-tools/:id-DELETE-param': ParamId,

    '/company-POST-body': CreateCompanyDto,
    '/company/:id-PUT-body': UpdateCompanyDto,
    '/company/:id-PUT-param': ParamId,
    '/company/:id/hearing-tools-GET-param': ParamId,
    '/company/:id-DELETE-param': ParamId,
}

export function validateRequest(req: Request, res: Response, next: NextFunction): any {
    let path = req.route.path
    console.log(path);
    
    const responseInstanceBody = plainToInstance(
        paths[`${path}-${req.method}-body`],
        req.body as any
    );

    const responseInstanceParams = plainToInstance(
        paths[`${path}-${req.method}-param`],
        (Object.keys(req.query).length ? req.query : req.params) as any
    );

    const errorsBody = validateSync(responseInstanceBody);
    const errorsParams = validateSync(responseInstanceParams);
    
    if (paths[`${path}-${req.method}-body`] != undefined && errorsBody.length > 0) {
        next(new ClientError('Validation error body', 403, buildError(errorsBody)))
    }

    if (paths[`${path}-${req.method}-param`] != undefined && errorsParams.length > 0) {
        next(new ClientError('Validation error param', 403, buildError(errorsParams)))
    }

    return next()
}

function buildError(errors) {

    const result = {};
    errors.forEach(el => {
        if (el.children.length) {
            el.children.forEach(child => {
                if (child.children.length) {
                    result[child.property] = this.buildError(child)
                } else {
                    Object.entries(child.constraints).forEach((constraint: any) => {
                        result[child.property] = `${el.property}.${child.constraints[constraint[0]]}`;
                    });
                }
            })

        } else {
            Object.entries(el.constraints).forEach((constraint: any) => {
                result[el.property] = el.constraints[constraint[0]];
            });
        }
    });
    return result;
}
