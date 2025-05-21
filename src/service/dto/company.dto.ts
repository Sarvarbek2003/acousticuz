import { Type } from "class-transformer"
import { IsBoolean, IsOptional, IsString, ValidateNested } from "class-validator"
import { MessageModel } from "./services.dto"

export class CreateCompanyDto {
    @IsString()
    img: string
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    img_post: MessageModel
    @IsString()
    name: string
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    description: MessageModel
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    post: MessageModel
    @IsString()
    phone: string
}

export class UpdateCompanyDto {
    @IsString()
    @IsOptional()
    img: string
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    img_post: MessageModel
    @IsOptional()
    @IsString()
    name: string
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    description: MessageModel
    @IsOptional()   
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    post: MessageModel
    @IsOptional()   
    @IsString()
    phone: string
}