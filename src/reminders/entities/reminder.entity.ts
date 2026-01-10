import { Column, Entity, ManyToOne } from "typeorm";
import { ReminderStatus } from "./reminder.constants";
import { Event } from "../../events/entities/event.entity";
import { BaseEntity } from "src/shared/entities/base.entity";
@Entity()
export class Reminder extends BaseEntity {

    @Column({ nullable: true })
    description: string;

    @Column()
    date: Date;

    @Column({
        type: 'enum',
        enum: ReminderStatus,
        default: ReminderStatus.PENDING
    })
    status: ReminderStatus;

    @ManyToOne(() => Event, (event) => event.reminders)
    event: Event;
}
