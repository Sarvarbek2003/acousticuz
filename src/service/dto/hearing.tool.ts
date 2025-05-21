import { Type } from "class-transformer"
import { IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"
import { MessageModel } from "./services.dto"

export class CreateHearingToolDto {
    @IsString()
    img: string
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    name: string
    @IsString()
    price: string
    @IsNumber()
    company_id: number
    @IsString()
    madein: string
    @IsBoolean()
    inCash: boolean
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    description: string
}

export class UpdateHearingToolDto {
    @IsString()
    @IsOptional()
    img?: string
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    name?: MessageModel
    @IsString()
    @IsOptional()
    price?: string
    @IsNumber()
    @IsOptional()
    company_id: number
    @IsString()
    @IsOptional()
    madein?: string
    @IsBoolean()
    @IsOptional()
    inCash?: boolean
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    @IsOptional()
    description?: string
}