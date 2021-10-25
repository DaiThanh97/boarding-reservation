import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class StartRideDto {
  @IsDate()
  @ApiProperty({ type: Date })
  startDateTime!: Date;
}

export class FinishRideDto {
  @IsDate()
  @ApiProperty({ type: Date })
  finishDateTime!: Date;
}
