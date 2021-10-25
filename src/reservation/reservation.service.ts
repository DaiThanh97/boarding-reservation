import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverService } from 'src/driver/driver.service';
import { GetDriverDto } from 'src/driver/dtos/getDriver.dto';
import { CurrentUser } from 'src/users/interfaces/user.interface';
import { ArrangeDriverDto } from './dtos/arrangeDriver.dto';
import { FinishRideDto, StartRideDto } from './dtos/changeStatus.dto';
import { CreateReservationDto } from './dtos/createReservation.dto';
import { ReservationEntity } from './reservation.entity';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationRepository)
    private readonly reservationRepository: ReservationRepository,
    private readonly driverService: DriverService,
  ) {}

  async allReservations(): Promise<ReservationEntity[]> {
    return this.reservationRepository.getAllReservations();
  }

  async createReservation(
    createReservationDto: CreateReservationDto,
    user: CurrentUser,
  ): Promise<ReservationEntity> {
    return this.reservationRepository.createReservation(
      createReservationDto,
      user,
    );
  }

  async arrangeDriver(
    reservationId: number,
    arrangeDriverDto: ArrangeDriverDto,
  ): Promise<ReservationEntity> {
    const driverDto: GetDriverDto = {
      name: arrangeDriverDto.name,
      phone: arrangeDriverDto.phone,
      vehiclePlate: arrangeDriverDto.vehiclePlate,
    };
    const driver = await this.driverService.getDriver(driverDto);

    return this.reservationRepository.arrangeDriver(reservationId, driver);
  }

  async startRide(
    reservationId: number,
    startRideDto: StartRideDto,
  ): Promise<ReservationEntity> {
    return this.reservationRepository.startRide(reservationId, startRideDto);
  }

  async finishRide(
    reservationId: number,
    finishRideDto: FinishRideDto,
  ): Promise<ReservationEntity> {
    return this.reservationRepository.finishRide(reservationId, finishRideDto);
  }

  async cancelRide(
    reservationId: number,
    user: CurrentUser,
  ): Promise<ReservationEntity> {
    return this.reservationRepository.cancelRide(reservationId, user);
  }
}
