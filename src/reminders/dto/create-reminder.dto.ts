import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Event } from "src/events/entities/event.entity";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateReminderDto {
    @IsNotEmpty({ message: i18nValidationMessage('validators.IS_NOT_EMPTY') })
    @IsString({ message: i18nValidationMessage('validators.IS_STRING') })
    description: string;

    @IsNotEmpty({ message: i18nValidationMessage('validators.IS_NOT_EMPTY') })
    @Type(() => Date)
    @IsDate({ message: i18nValidationMessage('validators.IS_DATE') })
    date: Date;

    @IsNotEmpty({ message: i18nValidationMessage('validators.IS_NOT_EMPTY') })
    event: Event;
}
