import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Injectable, Inject, ConflictException, NotFoundException } from '@nestjs/common';

@Injectable()
export class RolesService {

  constructor(@Inject('ROLE_REPOSITORY')
  private roleRepository: Repository<Role>,
    private readonly i18nService: I18nService
  ) { }

  async create(createRoleDto: CreateRoleDto) {
    const roleExists = await this.roleRepository.findOneBy({ name: createRoleDto.name });

    if (roleExists) {
      throw new ConflictException(this.i18nService.t("errors.ROLE_ALREADY_EXISTS", { args: { name: createRoleDto.name } }));
    }

    const role = await this.roleRepository.create(createRoleDto);

    await this.roleRepository.save(role);

    return role;
  }

  async findAll() {
    const roles = await this.roleRepository.find();

    if (!roles) throw new NotFoundException(this.i18nService.t("errors.ROLES_NOT_FOUND"));

    return roles;
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOneBy({ id });

    if (!role) throw new NotFoundException(this.i18nService.t("errors.ROLE_NOT_FOUND"));

    return role;
  }

  async findOneByName(name: string) {
    const role = await this.roleRepository.findOneBy({ name });

    if (!role) throw new NotFoundException(this.i18nService.t("errors.ROLE_NOT_FOUND"));

    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {

    await this.findOne(id)

    return await this.roleRepository.update(id, updateRoleDto);
  }

  async remove(id: number) {

    const role = await this.findOne(id)

    // This will make the role soft deleted knowing about the deletedAt column with decorator @DeleteDateColumn()
    return await this.roleRepository.softDelete(role);
  }
}