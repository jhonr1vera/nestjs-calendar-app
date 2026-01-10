import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import { Event } from "../../events/entities/event.entity";
import { Role } from "src/roles/entities/role.entity";
import { BaseEntity } from "src/shared/entities/base.entity";

@Entity()
export class User extends BaseEntity {

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    username: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    defaultTimeZone: string;

    @Column()
    status: string;

    @Column({ nullable: true })
    lastLoginAt: Date;

    @Column({ nullable: true })
    locale: string;

    @Column()
    loginProvider: string;

    @ManyToOne(() => Role, (role) => role.users)
    role: Role;

    @OneToMany(() => Event, (event) => event.user)
    events: Event[];
}
