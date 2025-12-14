import { IsEmail, IsString, IsDate } from "class-validator";

export class CreateUserDto {

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    role: string;

    @IsString()
    defaultTimeZone: string;

    @IsString()
    status: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}
