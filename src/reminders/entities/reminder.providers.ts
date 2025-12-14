import { DataSource } from 'typeorm';
import { Reminder } from './reminder.entity';

export const reminderProviders = [
    {
        provide: 'REMINDER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Reminder),
        inject: ['DATA_SOURCE'],
    },
];