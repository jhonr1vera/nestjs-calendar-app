import { EventsService } from './events.service';
import { User } from 'src/users/entities/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post()
  create(@Body() createEventDto: CreateEventDto, @GetUser() user: User) {
    return this.eventsService.create(createEventDto, user);
  }

  @Roles('admin')
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get('me')
  findAllByUser(@GetUser() user: User) {
    return this.eventsService.findAllByUser(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.eventsService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto, @GetUser() user: User) {
    return this.eventsService.update(+id, updateEventDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.eventsService.remove(+id, user);
  }
}
