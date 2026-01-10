import { I18nService } from 'nestjs-i18n';
import { MailService } from 'src/mail/mail.service';
import { User } from 'src/users/entities/user.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import { Reminder } from './entities/reminder.entity';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { ReminderStatus } from './entities/reminder.constants';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';

@Injectable()
export class RemindersService {

  constructor(@Inject('REMINDER_REPOSITORY')
  private reminderRepository: Repository<Reminder>,
    private readonly mailService: MailService,
    private readonly i18nService: I18nService
  ) { }

  async create(createReminderDto: CreateReminderDto) {
    const reminder = this.reminderRepository.create(createReminderDto);

    return await this.reminderRepository.save(reminder);
  }

  async findAll() {
    const reminders = await this.reminderRepository.find();

    if (!reminders) throw new NotFoundException(this.i18nService.t("validators.REMINDERS_NOT_FOUND"));

    return reminders;
  }

  async findAllByUser(user: User) {
    const reminders = await this.reminderRepository.find({
      where: { event: { user: { id: user.id } } }
    });

    if (!reminders) throw new NotFoundException(this.i18nService.t("validators.REMINDERS_NOT_FOUND"));

    return reminders;
  }

  async findAllByEvent(eventId: number, user: User) {
    const reminders = await this.reminderRepository.find({
      where: { event: { id: eventId, user: { id: user.id } } }
    });

    if (!reminders) throw new NotFoundException(this.i18nService.t("validators.REMINDERS_NOT_FOUND"));

    return reminders;
  }

  async findOne(id: number, user: User) {
    const reminder = await this.reminderRepository.findOne({ where: { id }, relations: { event: { user: true } } });

    if (!reminder || reminder.event.user.id !== user.id) throw new NotFoundException(this.i18nService.t("validators.REMINDER_NOT_FOUND"));

    return reminder;
  }

  async update(id: number, updateReminderDto: UpdateReminderDto, user: User) {

    await this.findOne(id, user)

    return await this.reminderRepository.update(id, updateReminderDto);
  }

  async remove(id: number, user: User) {
    await this.findOne(id, user)

    return await this.reminderRepository.softDelete(id);
  }

  async reviewReminders() {
    const reminders = await this.reminderRepository.find({
      where: { status: ReminderStatus.PENDING, date: LessThanOrEqual(new Date()) }, relations: {
        event: {
          user: true
        }
      }
    });
    let i = 0;

    for (const reminder of reminders) {
      try {
        await this.mailService.reminderMail(reminder, this.i18nService.t("messages.REMINDER_MAIL", { lang: reminder.event.user.locale }), 'reminder');
        await this.reminderRepository.update(reminder.id, { status: ReminderStatus.SENT });
      } catch (error) {
        console.error(error);
      }

      i++;
    }

    return i;
  }
}
