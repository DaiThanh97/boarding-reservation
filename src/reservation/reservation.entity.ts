import { DriverEntity } from 'src/driver/driver.entity';
import { UserEntity } from 'src/users/user.entity';
import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ReservationStatus } from './reservation.constant';

@Entity({ name: 'reservation' })
export class ReservationEntity {
  @PrimaryGeneratedColumn()
  @Index('IDX_ID')
  id!: number;

  @Column()
  createDateTime!: Date;

  @Column({ nullable: true })
  startDateTime?: Date;

  @Column({ nullable: true })
  finishDateTime?: Date;

  @Column()
  placeOfDeparture!: string;

  @Column()
  destination!: string;

  @Column()
  estimateArrival!: number;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.WAITING,
  })
  status!: string;

  @OneToOne(() => UserEntity, (user) => user.reservation, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  user!: UserEntity;

  @OneToOne(() => DriverEntity, (driver) => driver.reservation, {
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn()
  driver!: DriverEntity;
}
