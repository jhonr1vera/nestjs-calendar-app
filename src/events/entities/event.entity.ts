import { User } from "src/users/entities/user.entity";
import { Reminder } from "src/reminders/entities/reminder.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { BaseEntity } from "src/shared/entities/base.entity";

@Entity()
export class Event extends BaseEntity {

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    startAt: Date;

    @Column()
    endAt: Date;

    @ManyToOne(() => User, (user) => user.events)
    user: User;

    @OneToMany(() => Reminder, (reminder) => reminder.event)
    reminders: Reminder[];

}
