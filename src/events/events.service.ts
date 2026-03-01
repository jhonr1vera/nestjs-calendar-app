import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { Event } from './entities/event.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { RemindersService } from 'src/reminders/reminders.service';
import { Injectable, Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
@Injectable()
export class EventsService {

  constructor(@Inject('EVENT_REPOSITORY')
  private eventRepository: Repository<Event>,
    private remindersService: RemindersService,
    private readonly i18nService: I18nService) { }

  async create(createEventDto: CreateEventDto, user: User) {
    const event = await this.eventRepository.create({
      ...createEventDto,
      user
    });

    await this.eventRepository.save(event);

    await this.remindersService.create({
      date: new Date(event.startAt.getTime() - 60 * 1000),
      description: this.i18nService.t("messages.DEFAULT_REMINDER_DESCRIPTION"),
      event: event
    });

    return event;

  }

  async findAll() {

    const events = await this.eventRepository.find();

    if (!events) throw new NotFoundException(this.i18nService.t("validators.EVENTS_NOT_FOUND"));

    return events;
  }

  async findAllByUser(user: User) {

    const events = await this.eventRepository.find({
      where: { user },
      relations: ['reminders']
    });

    return events;
  }

  async findOne(id: number, user: User) {
    const event = await this.eventRepository.findOne({
      where: { id, user: { id: user.id } },
      relations: ['reminders']
    });

    if (!event) throw new NotFoundException(this.i18nService.t("validators.EVENT_NOT_FOUND"));

    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto, user: User) {
    await this.findOne(id, user)

    return await this.eventRepository.update(id, updateEventDto);
  }

  async remove(id: number, user: User) {
    await this.findOne(id, user)

    return await this.eventRepository.softDelete(id);
  }
}
