import { Injectable } from '@nestjs/common';
import { DriverEntity } from './driver.entity';
import { DriverRepository } from './driver.repository';
import { GetDriverDto } from './dtos/getDriver.dto';

@Injectable()
export class DriverService {
  constructor(private readonly driverRepository: DriverRepository) {}

  async getDriver(getDriverDto: GetDriverDto): Promise<DriverEntity> {
    return this.driverRepository.getDriver(getDriverDto);
  }
}
