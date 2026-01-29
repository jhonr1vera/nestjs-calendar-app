import { IsEmail, IsOptional, IsString } from "class-validator";
import { Role } from 'src/roles/entities/role.entity';

export class CreateUserDto {

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsOptional()
    role: Role;

    @IsString()
    @IsOptional()
    defaultTimeZone: string;

    @IsString()
    @IsOptional()
    locale: string;
}
