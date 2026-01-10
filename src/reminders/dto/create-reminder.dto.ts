import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateReminderDto {
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsDate()
    date: Date;
}
