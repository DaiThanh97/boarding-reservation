import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString } from 'class-validator';

export class ArrangeDriverDto {
  @IsString()
  @ApiProperty({ type: String })
  name!: string;

  @IsPhoneNumber()
  @ApiProperty({ type: String })
  phone!: string;

  @IsString()
  @ApiProperty({ type: String })
  vehiclePlate!: string;
}
