import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { MessageModel } from './services.dto';

export class CreateCatalogCardsDto {
    @IsString()
    @IsNotEmpty()
    img: string;

    @IsString()
    @IsNotEmpty()
    img_post: string;

    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    title: MessageModel;
    
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    post: MessageModel;

    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    text: MessageModel;

    @IsString()
    link: string;
}

export class UpdateCatalogCardsDto {
    @IsOptional()
    @IsString()
    img?: string;

    @IsOptional()
    @IsString()
    img_post?: string;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    title?: MessageModel;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    text?: MessageModel;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    post?: MessageModel;

    @IsOptional()
    @IsString()
    link?: string;
}
