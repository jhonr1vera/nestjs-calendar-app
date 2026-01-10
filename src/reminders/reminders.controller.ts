import { User } from 'src/users/entities/user.entity';
import { RemindersService } from './reminders.service';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) { }

  @Post()
  create(@Body() createReminderDto: CreateReminderDto) {
    return this.remindersService.create(createReminderDto);
  }

  @Roles('admin')
  @Get()
  findAll() {
    return this.remindersService.findAll();
  }

  @Get('me')
  findAllByUser(@GetUser() user: User) {
    return this.remindersService.findAllByUser(user);
  }

  @Get('event/:id')
  findAllByEvent(@Param('id') id: string, @GetUser() user: User) {
    return this.remindersService.findAllByEvent(+id, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.remindersService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReminderDto: UpdateReminderDto, @GetUser() user: User) {
    return this.remindersService.update(+id, updateReminderDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.remindersService.remove(+id, user);
  }
}
