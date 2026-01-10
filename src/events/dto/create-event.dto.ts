import { IsNotEmpty, IsString, IsDate } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateEventDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsDate()
    startAt: Date;

    @IsNotEmpty()
    @IsDate()
    endAt: Date;

    @IsNotEmpty()
    @IsString()
    description: string;
}
