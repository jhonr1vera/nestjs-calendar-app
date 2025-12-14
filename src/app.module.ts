import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { EventsModule } from './events/events.module';
import { RemindersModule } from './reminders/reminders.module';

@Module({
  imports: [AuthModule, UsersModule, RolesModule, EventsModule, RemindersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
