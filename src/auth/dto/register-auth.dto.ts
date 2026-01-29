import { i18nValidationMessage } from "nestjs-i18n";
import { IsMatch } from "src/shared/decorators/is-match.decorator";
import { IsEmail, IsString, Matches, MinLength, MaxLength } from "class-validator";

export class RegisterAuthDto {
    @IsString({ message: i18nValidationMessage('validators.IS_STRING') })
    @IsEmail({}, { message: i18nValidationMessage('validators.IS_EMAIL') })
    email: string;

    @IsString({ message: i18nValidationMessage('validators.IS_STRING') })
    @MinLength(4, { message: i18nValidationMessage('validators.MIN_LENGTH') })
    @MaxLength(20, { message: i18nValidationMessage('validators.MAX_LENGTH') })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: i18nValidationMessage('validators.PASSWORD_TOO_WEAK') })
    password: string;

    @IsString({ message: i18nValidationMessage('validators.IS_STRING') })
    @MinLength(4, { message: i18nValidationMessage('validators.MIN_LENGTH') })
    @MaxLength(20, { message: i18nValidationMessage('validators.MAX_LENGTH') })
    @IsMatch('password', { message: i18nValidationMessage('validators.IS_MATCH') })
    passwordConfirm: string;

    @IsString({ message: i18nValidationMessage('validators.IS_STRING') })
    @MinLength(4, { message: i18nValidationMessage('validators.MIN_LENGTH') })
    @MaxLength(20, { message: i18nValidationMessage('validators.MAX_LENGTH') })
    username: string;

    // @IsString()
    // @MinLength(2)
    // @MaxLength(20)
    // firstName: string;

    // @IsString()
    // @MinLength(2)
    // @MaxLength(20)
    // lastName: string;

    // @IsString()
    // @MinLength(2)
    // @MaxLength(20)
    // locale: string;
}
