import { ReservationEntity } from 'src/reservation/reservation.entity';
import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'driver' })
export class DriverEntity {
  @PrimaryGeneratedColumn()
  @Index('IDX_ID')
  id!: number;

  @Column({ nullable: true })
  driverName?: string;

  @Column({ nullable: true, unique: true })
  driverPhone?: string;

  @Column({ nullable: true, unique: true })
  vehiclePlate?: string;

  @OneToOne(() => ReservationEntity, (reservation) => reservation.driver)
  reservation!: ReservationEntity;
}
