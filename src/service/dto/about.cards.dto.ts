import { Type } from "class-transformer";
import { IsBoolean, IsOptional, IsString, ValidateNested } from "class-validator";
import { MessageModel } from "./services.dto";

export class CreateAboutCardsDto {
    @IsString()
    img: string;

    @IsBoolean()
    @IsOptional()
    main:boolean
    
    @IsString()
    @IsOptional()
    img_post: string;

    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    post: MessageModel;

    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    title: MessageModel;

    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    text: MessageModel;

    @IsString()
    link: string;
}

export class UpdateAboutCardsDto {
    @IsOptional()
    @IsString()
    img?: string;

    @IsBoolean()
    @IsOptional()
    main?:boolean
    
    @IsString()
    @IsOptional()
    img_post?: string;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    post?: string;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    title?: MessageModel;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    text?: MessageModel;

    @IsOptional()
    @IsString()
    link?: string;
}