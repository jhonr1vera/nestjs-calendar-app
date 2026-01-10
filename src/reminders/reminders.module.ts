import { Module } from '@nestjs/common';
import { MailModule } from 'src/mail/mail.module';
import { RemindersService } from './reminders.service';
import { RemindersCronService } from './reminders.cron';
import { RemindersController } from './reminders.controller';
import { DatabaseModule } from 'src/database/database.module';
import { reminderProviders } from './entities/reminder.providers';

@Module({
  imports: [DatabaseModule, MailModule],
  controllers: [RemindersController],
  providers: [RemindersService, RemindersCronService, ...reminderProviders],
  exports: [RemindersService],
})
export class RemindersModule { }
