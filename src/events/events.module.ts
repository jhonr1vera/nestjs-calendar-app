import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { DatabaseModule } from 'src/database/database.module';
import { eventProviders } from './entities/event.providers';
import { RemindersModule } from 'src/reminders/reminders.module';

@Module({
  imports: [DatabaseModule, RemindersModule],
  controllers: [EventsController],
  providers: [EventsService, ...eventProviders],
})
export class EventsModule { }
