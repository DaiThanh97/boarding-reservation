import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DriverEntity } from 'src/driver/driver.entity';
import { CurrentUser } from 'src/users/interfaces/user.interface';
import { EntityRepository, Repository } from 'typeorm';
import { FinishRideDto, StartRideDto } from './dtos/changeStatus.dto';
import { CreateReservationDto } from './dtos/createReservation.dto';
import { ReservationStatus } from './reservation.constant';
import { ReservationEntity } from './reservation.entity';

@EntityRepository(ReservationEntity)
export class ReservationRepository extends Repository<ReservationEntity> {
  async createReservation(
    createReservationDto: CreateReservationDto,
    user: CurrentUser,
  ): Promise<ReservationEntity> {
    const reservation = this.create({
      createDateTime: createReservationDto.dateTime,
      placeOfDeparture: createReservationDto.placeOfDepature,
      destination: createReservationDto.destination,
      estimateArrival: createReservationDto.estimateArrival,
      user,
    });

    await this.save(reservation);
    return reservation;
  }

  async getAllReservations(): Promise<ReservationEntity[]> {
    return this.find();
  }

  async getReservationById(reservationId: number): Promise<ReservationEntity> {
    const found = await this.findOne(reservationId);
    if (!found) {
      throw new NotFoundException(
        `Reservation with ID "${reservationId}" not found`,
      );
    }
    return found;
  }

  async getReservationByIdAndUser(
    reservationId: number,
    user: CurrentUser,
  ): Promise<ReservationEntity> {
    const found = await this.findOne({ id: reservationId, user });
    if (!found) {
      throw new NotFoundException(
        `Reservation with ID "${reservationId}" of user not found`,
      );
    }
    return found;
  }

  async getAvailableReservationByDriver(
    driver: DriverEntity,
    createDateTime: Date,
  ): Promise<ReservationEntity[]> {
    const found = this.createQueryBuilder('reservation')
      .where('reservation.driverId = :driverId', { driverId: driver.id })
      .andWhere('reservation.status IN(:...status)', {
        status: [ReservationStatus.ONGOING, ReservationStatus.ARRANGED],
      })
      .andWhere(
        ':createDateTime BETWEEN reservation.startDateTime AND DATE_ADD(reservation.startDateTime, INTERVAL reservation.estimateArrival MINUTE)',
        {
          createDateTime,
        },
      )
      .getMany();
    return found;
  }

  async arrangeDriver(
    reservationId: number,
    driver: DriverEntity,
  ): Promise<ReservationEntity> {
    const reservation = await this.getReservationById(reservationId);

    if (reservation.driver) {
      throw new BadRequestException('Reservation is already arranged');
    }

    const reservations: ReservationEntity[] =
      await this.getAvailableReservationByDriver(
        driver,
        reservation.createDateTime,
      );

    if (reservations.length > 0) {
      throw new BadRequestException('Conflict time for driver');
    }

    reservation.status = ReservationStatus.ARRANGED;
    reservation.driver = driver;

    await this.save(reservation);
    return reservation;
  }

  async startRide(
    reservationId: number,
    startRideDto: StartRideDto,
  ): Promise<ReservationEntity> {
    const reservation = await this.getReservationById(reservationId);

    if (reservation.status !== ReservationStatus.ARRANGED) {
      throw new BadRequestException('Reservation status is not compatible');
    }

    reservation.status = ReservationStatus.ONGOING;
    reservation.startDateTime = startRideDto.startDateTime;

    await this.save(reservation);
    return reservation;
  }

  async finishRide(
    reservationId: number,
    finishRideDto: FinishRideDto,
  ): Promise<ReservationEntity> {
    const reservation = await this.getReservationById(reservationId);

    if (reservation.status !== ReservationStatus.ONGOING) {
      throw new BadRequestException('Reservation status is not compatible');
    }

    reservation.status = ReservationStatus.ONGOING;
    reservation.finishDateTime = finishRideDto.finishDateTime;

    await this.save(reservation);
    return reservation;
  }

  async cancelRide(
    reservationId: number,
    user: CurrentUser,
  ): Promise<ReservationEntity> {
    const reservation = await this.getReservationByIdAndUser(
      reservationId,
      user,
    );

    if (reservation.status !== ReservationStatus.WAITING) {
      throw new BadRequestException('Reservation cannot cancelled');
    }

    reservation.status = ReservationStatus.CANCELLED;

    await this.save(reservation);
    return reservation;
  }
}
