import { IsString } from 'class-validator';

export class GetDriverDto {
  @IsString()
  name!: string;

  @IsString()
  phone!: string;

  @IsString()
  vehiclePlate!: string;
}
