import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { MessageModel } from "./services.dto";

export class CreateDoctorDto {
    @IsString()
    img: string;

    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    doctorsName: MessageModel;

    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    aboutDoctor: MessageModel;

    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    experience: MessageModel;

    @IsString()
    link: string;
}

export class UpdateDoctorDto {
    @IsOptional()
    @IsString()
    img: string;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    doctorsName: MessageModel;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    aboutDoctor: MessageModel;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => MessageModel)
    experience: MessageModel;

    @IsOptional()
    @IsString()
    link: string;
}