import { Injectable, Logger } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class RemindersCronService {
    private readonly logger = new Logger(RemindersCronService.name);

    constructor(private readonly remindersService: RemindersService) { }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleReviewReminders() {
        try {
            this.logger.debug('Reviewing reminders...');
            const remindersReviewed = await this.remindersService.reviewReminders();

            this.logger.debug(`Reviewed ${remindersReviewed} reminders`)
        } catch (error) {
            this.logger.error("Error reviewing reminders", error);
        }
    }
}