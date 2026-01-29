import { IsNotEmpty, IsString, IsDate, MinLength, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateEventDto {

    @IsNotEmpty({ message: i18nValidationMessage('validators.IS_NOT_EMPTY') })
    @IsString({ message: i18nValidationMessage('validators.IS_STRING') })
    @MinLength(3, { message: i18nValidationMessage('validators.MIN_LENGTH') })
    title: string;

    @IsNotEmpty({ message: i18nValidationMessage('validators.IS_NOT_EMPTY') })
    @Type(() => Date)
    @IsDate({ message: i18nValidationMessage('validators.IS_DATE') })
    startAt: Date;

    @IsNotEmpty({ message: i18nValidationMessage('validators.IS_NOT_EMPTY') })
    @Type(() => Date)
    @IsDate({ message: i18nValidationMessage('validators.IS_DATE') })
    endAt: Date;

    @IsOptional()
    @IsString()
    description: string;
}
