import { I18nService } from 'nestjs-i18n';
import { Injectable, Logger } from '@nestjs/common';
import { ApiUtil } from 'src/shared/utils/api.util';
import { User } from 'src/users/entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { DateUtils } from 'src/shared/utils/date.utils';
import { Reminder } from 'src/reminders/entities/reminder.entity';

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);

    private get subjectPrefix(): string {
        return ` - ${new Date().toLocaleString()} UTC - ${ApiUtil.isProductionEnvironment() ? "" : `(${process.env.ENVIRONMENT})`}`;
    }

    constructor(private readonly mailerService: MailerService, private readonly i18nService: I18nService) { }

    async welcomeMail(user: User, subject: string, template: string) {

        try {
            await this.mailerService.sendMail({
                to: user.email,
                subject: subject + this.subjectPrefix,
                template: mailTemplates[user.locale][template],
                context: {
                    name: user.firstName,
                },
            });
        } catch (error) {
            this.logger.error(this.i18nService.t("errors.MAIL_ERROR"), error);
        }
    }

    async reminderMail(reminder: Reminder, subject: string, template: string) {

        try {
            await this.mailerService.sendMail({
                to: reminder.event.user.email,
                subject: subject + this.subjectPrefix,
                template: mailTemplates[reminder.event.user.locale][template],
                context: {
                    name: reminder.event.user.firstName,
                    date: DateUtils.getTimeDifference(reminder.date, reminder.event.startAt),
                    event: reminder.event,
                    description: reminder.description,
                },
            });
        } catch (error) {
            this.logger.error(this.i18nService.t("errors.MAIL_ERROR"), error);
        }
    }
}

const mailTemplates = {
    en: {
        welcome: 'welcome-en',
        reminder: 'reminder-en',
    },
    es: {
        welcome: 'welcome-es',
        reminder: 'reminder-es',
    }
}


