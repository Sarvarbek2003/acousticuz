import { Type } from "class-transformer";
import { IsBoolean, IsNumberString, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

export class MessageModel {
    @IsString()
    ru: string
    @IsString()
    uz: string
}

export class CreateServiceDto {
    @IsString()
    img: string

    @IsString()
    link: string
    
    @IsBoolean()
    @IsOptional()
    main:boolean

    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    title: MessageModel
    
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    text: MessageModel
}

export class UpdateServiceDto {
    @IsString()
    @IsOptional()
    img: string

    @IsString()
    @IsOptional()
    link: string

    @IsBoolean()
    @IsOptional()
    main:boolean

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    title: MessageModel

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    text: MessageModel
}

export class ParamId {
    @IsNumberString()
    id: string
}