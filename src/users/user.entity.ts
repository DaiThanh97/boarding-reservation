import { ReservationEntity } from 'src/reservation/reservation.entity';
import {
  Column,
  Entity,
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  @Index('IDX_ID')
  id!: number;

  @Column({ unique: true })
  @Index('IDX_USERNAME')
  username!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  phone!: string;

  @CreateDateColumn()
  createDate!: Date;

  @OneToOne(() => ReservationEntity, (reservation) => reservation.user)
  reservation!: ReservationEntity;
}
