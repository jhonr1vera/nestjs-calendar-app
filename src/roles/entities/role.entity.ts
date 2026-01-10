import { User } from "src/users/entities/user.entity";
import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "src/shared/entities/base.entity";

@Entity()
export class Role extends BaseEntity {

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[]
}
