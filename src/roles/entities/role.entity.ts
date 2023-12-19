import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    idRole: number;

    @Column({type: 'varchar', length:30})
    name: string;

    @Column({type: 'varchar', length:30})
    description: string;

    @Column({type: 'varchar', select: false})
    status: string;

    @OneToMany(() => User, (user: User) => user.role)
    user: User;
}
