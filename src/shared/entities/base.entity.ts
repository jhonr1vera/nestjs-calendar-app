import { DeleteDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column, Generated } from "typeorm";

export class BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column()
    @Generated("uuid")
    publicId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}