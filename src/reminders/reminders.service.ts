import { Injectable, Inject } from '@nestjs/common';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { Repository } from 'typeorm';
import { Reminder } from './entities/reminder.entity';

@Injectable()
export class RemindersService {

  constructor(@Inject('REMINDER_REPOSITORY')
  private reminderRepository: Repository<Reminder>) { }

  create(createReminderDto: CreateReminderDto) {
    return 'This action adds a new reminder';
  }

  findAll() {
    return `This action returns all reminders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reminder`;
  }

  update(id: number, updateReminderDto: UpdateReminderDto) {
    return `This action updates a #${id} reminder`;
  }

  remove(id: number) {
    return `This action removes a #${id} reminder`;
  }
}
