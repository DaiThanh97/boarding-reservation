import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, Min } from 'class-validator';

export class CreateReservationDto {
  @IsDate()
  @ApiProperty({ type: Date, description: 'Reservation date' })
  dateTime!: Date;

  @IsString()
  @ApiProperty({ type: String, description: 'Pick place' })
  placeOfDepature!: string;

  @IsString()
  @ApiProperty({ type: String })
  destination!: string;

  @IsNumber()
  @Min(1)
  @ApiProperty({ type: Number, default: 10 })
  estimateArrival!: number;
}
