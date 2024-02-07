import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Leads {
  @PrimaryGeneratedColumn()
  idRegister: number;

  @Column({ type: 'varchar', length: 40 })
  fullName: string;

  @Column({ type: 'varchar', length: 30 })
  email: string;

  @Column({ type: 'varchar', length: 40 })
  corporate: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 15 })
  country: string;

  @Column({ type: 'varchar', select: true })
  status: string;
}
