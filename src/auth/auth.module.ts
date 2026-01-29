import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailService } from 'src/mail/mail.service';
import { RolesModule } from 'src/roles/roles.module';
import { DatabaseModule } from 'src/database/database.module';
import { GoogleStrategy } from 'src/google-auth/google.strategy';
import { UsersModule } from 'src/users/users.module';
import { HashService } from 'src/hash/hash.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, MailService, HashService],
  imports: [DatabaseModule, RolesModule, UsersModule],
})
export class AuthModule { }
