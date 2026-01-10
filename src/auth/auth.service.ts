import { ConflictException, ForbiddenException, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { User } from 'src/users/entities/user.entity';
import { MailService } from 'src/mail/mail.service';
import { I18nService } from 'nestjs-i18n';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly i18nService: I18nService,
    private readonly roleService: RolesService
  ) { }

  generateToken(user: User) {
    const payload = {
      sub: user.publicId,
      role: user.role
    }

    return this.jwtService.signAsync(payload);
  }

  async register(RegisterAuthDto: RegisterAuthDto) {

    const userExists = await this.usersService.findOneByEmail(RegisterAuthDto.email);

    if (userExists) {
      throw new ConflictException(this.i18nService.t("validators.USER_ALREADY_EXISTS"));
    }

    const role = await this.roleService.findOneByName('user');

    if (!role) {
      throw new ServiceUnavailableException(this.i18nService.t("errors.UNABLE_TO_CREATE_USER"));
    }

    const userDto = {
      ...RegisterAuthDto,
      role: role,
      status: 'active',
      lastLoginAt: new Date(),
      locale: 'en',
      loginProvider: 'local',
      defaultTimeZone: 'UTC',
    }

    const user = await this.usersService.create(userDto);

    await this.mailService.welcomeMail(user, this.i18nService.t("messages.WELCOME_MAIL", { lang: user.locale }), 'welcome');

    return this.i18nService.t("messages.SUCCESS_REGISTER");

  }

  async registerAdmin(RegisterAuthDto: RegisterAuthDto) {

    const userExists = await this.usersService.findOneByEmail(RegisterAuthDto.email);

    if (userExists) {
      throw new ConflictException(this.i18nService.t("validators.USER_ALREADY_EXISTS"));
    }

    const role = await this.roleService.findOneByName('admin');

    if (!role) {
      throw new ServiceUnavailableException(this.i18nService.t("errors.UNABLE_TO_CREATE_USER"));
    }

    const userDto = {
      ...RegisterAuthDto,
      role: role
    }

    await this.usersService.create(userDto);

    return this.i18nService.t("messages.SUCCESS_REGISTER_ADMIN");

  }

  async localLogin(loginAuthDto: LoginAuthDto) {
    const userExists = await this.usersService.findOneByEmail(loginAuthDto.email);

    if (!userExists) {
      throw new NotFoundException(this.i18nService.t("validators.USER_NOT_FOUND"));
    }

    if (userExists.password !== loginAuthDto.password) {
      throw new ForbiddenException(this.i18nService.t("validators.INVALID_CREDENTIALS"));
    }

    return this.generateToken(userExists);
  }

  async googleLogin(user: User) {

    const userExists = await this.usersService.findOneByEmail(user.email);

    if (userExists) {
      return this.generateToken(userExists);
    }

    const role = await this.roleService.findOneByName('user');

    if (!role) {
      throw new ServiceUnavailableException(this.i18nService.t("errors.UNABLE_TO_CREATE_USER"));
    }

    const newUserDto = {
      ...user,
      role: role,
      status: 'active',
      lastLoginAt: new Date(),
      locale: 'en',
      loginProvider: 'google',
      defaultTimeZone: 'UTC',
    }

    const newUser = await this.usersService.create(newUserDto);

    await this.mailService.welcomeMail(newUser, this.i18nService.t("messages.WELCOME_MAIL", { lang: newUser.locale }), 'welcome');

    return this.generateToken(newUser);
  }
}