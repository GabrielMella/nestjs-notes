import { User } from "src/users/entities/user.entity";
import { 
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";


export enum TodoStatus {
    Pending = 'pending',
    Todo = 'todo',
    Doing = 'doing',
    Review = 'review',
    Done = 'done'
}

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({
        type: 'enum',
        default: TodoStatus.Pending,
        enum: TodoStatus
    })
    status: TodoStatus;

    @Column()
    userid: number;

    @ManyToOne(() => User, user => user.todos)
    @JoinColumn({ name: 'userid' })
    user: User;

    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updated_at: Date;

    constructor(props: {
        id: number,
        title: string,
        description: string,
        status: TodoStatus,
        created_at: Date,
        updated_at: Date
    }) {
        Object.assign(this, props)
    }
}
