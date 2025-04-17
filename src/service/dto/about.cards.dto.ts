import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { MessageModel } from "./services.dto";

export class CreateAboutCardsDto {
    @IsString()
    img: string;

    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    titleText: MessageModel;

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

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    titleText?: MessageModel;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    text?: MessageModel;

    @IsOptional()
    @IsString()
    link?: string;
}