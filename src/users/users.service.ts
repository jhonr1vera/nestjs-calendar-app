import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
    private readonly i18nService: I18nService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);

    return this.usersRepository.save(user);
  }

  async findAll() {
    const users = await this.usersRepository.find();

    if (!users) throw new NotFoundException(this.i18nService.t("errors.NO_USERS_REGISTERED"));

    return users;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(this.i18nService.t("errors.USER_NOT_FOUND"));

    return user
  }

  async findOneByEmail(email: string) {
    console.log(email);
    const user = await this.usersRepository.findOneBy({ email });

    return user
  }

  async findOneByPublicId(publicId: string) {
    const user = await this.usersRepository.findOne({
      where: { publicId },
      relations: ['role'],
      select: {
        id: true,
        publicId: true,
        locale: true,
        role: {
          name: true
        }
      }
    });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    await this.findOne(id)

    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {

    await this.findOne(id)

    return await this.usersRepository.softDelete(id);
  }
}
