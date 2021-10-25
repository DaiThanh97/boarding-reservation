import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiHeaders,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorators/getUser.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/users/interfaces/user.interface';
import { ArrangeDriverDto } from './dtos/arrangeDriver.dto';
import { FinishRideDto, StartRideDto } from './dtos/changeStatus.dto';
import { CreateReservationDto } from './dtos/createReservation.dto';
import { ReservationEntity } from './reservation.entity';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  @ApiOkResponse({ description: 'Get all reservations' })
  async allReservations(): Promise<ReservationEntity[]> {
    return this.reservationService.allReservations();
  }

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('Authentication')
  @ApiBody({ type: CreateReservationDto })
  @ApiCreatedResponse({ description: 'Create reservation' })
  @ApiUnauthorizedResponse({ description: 'Unauthenticate' })
  async createReservation(
    @Body() createReservationDto: CreateReservationDto,
    @GetUser() user: CurrentUser,
  ): Promise<ReservationEntity> {
    return this.reservationService.createReservation(
      createReservationDto,
      user,
    );
  }

  @Put('/:id/driver')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'reservaionId' })
  @ApiBody({ type: ArrangeDriverDto })
  @ApiOkResponse({ description: 'Arrange driver' })
  @ApiUnauthorizedResponse({ description: 'Unauthenticate' })
  @ApiNotFoundResponse()
  async arrangeDriver(
    @Param() reservationId: number,
    @Body() arrangeDriverDto: ArrangeDriverDto,
  ): Promise<ReservationEntity> {
    return this.reservationService.arrangeDriver(
      reservationId,
      arrangeDriverDto,
    );
  }

  @Put('/:id/status/ongoing')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'reservaionId' })
  @ApiBody({ type: StartRideDto })
  @ApiOkResponse({ description: 'Start ride' })
  @ApiUnauthorizedResponse({ description: 'Unauthenticate' })
  @ApiNotFoundResponse()
  async startRide(
    @Param() reservationId: number,
    @Body() startRideDto: StartRideDto,
  ): Promise<ReservationEntity> {
    return this.reservationService.startRide(reservationId, startRideDto);
  }

  @Put('/:id/status/finish')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'reservaionId' })
  @ApiBody({ type: FinishRideDto })
  @ApiOkResponse({ description: 'Finish ride' })
  @ApiUnauthorizedResponse({ description: 'Unauthenticate' })
  @ApiNotFoundResponse()
  async finishRide(
    @Param() reservationId: number,
    @Body() finishRideDto: FinishRideDto,
  ): Promise<ReservationEntity> {
    return this.reservationService.finishRide(reservationId, finishRideDto);
  }

  @Put('/:id/status/cancel')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'reservaionId' })
  @ApiOkResponse({ description: 'Finish ride' })
  @ApiNotFoundResponse()
  async cancelRide(
    @Param() reservationId: number,
    @GetUser() user: CurrentUser,
  ): Promise<ReservationEntity> {
    return this.reservationService.cancelRide(reservationId, user);
  }
}
