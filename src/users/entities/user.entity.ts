import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string; 

    @Column({ unique: true })
    email: string;

    @Column()
    password: string; 

    @Column()
    isAdmin: boolean;

    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updated_at: Date;

    constructor(props: {
        id: number,
        name: string,
        email: string,
        password: string,
        isAdmin: boolean,
        created_at: Date,
        updated_at: Date
    }) {
        Object.assign(this, props)
    }
}
