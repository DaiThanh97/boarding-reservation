import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { DriverEntity } from './driver.entity';
import { GetDriverDto } from './dtos/getDriver.dto';

@EntityRepository(DriverEntity)
export class DriverRepository extends Repository<DriverEntity> {
  async getDriver(getDriverDto: GetDriverDto): Promise<DriverEntity> {
    const found = await this.findOne({
      where: {
        driverName: getDriverDto.name,
        driverPhone: getDriverDto.phone,
        vehiclePlate: getDriverDto.vehiclePlate,
      },
    });
    if (!found) {
      throw new NotFoundException(`No driver found`);
    }
    return found;
  }
}
