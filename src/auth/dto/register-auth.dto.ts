import { IsEmail, IsOptional, IsString } from "class-validator";

export class RegisterAuthDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    username: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    defaultTimeZone: string;

    @IsString()
    locale: string;

    // @IsString()
    // @IsOptional()
    // role: string;
}
