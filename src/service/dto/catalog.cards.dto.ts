import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { MessageModel } from './services.dto';

export class CreateCatalogCardsDto {
    @IsString()
    @IsNotEmpty()
    img: string;

    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    titleKey: MessageModel;

    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    textKey: MessageModel;

    @IsString()
    link: string;
}

export class UpdateCatalogCardsDto {
    @IsOptional()
    @IsString()
    img?: string;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    titleKey?: MessageModel;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    textKey?: MessageModel;

    @IsOptional()
    @IsString()
    link?: string;
}
