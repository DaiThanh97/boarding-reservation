import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverRepository } from './driver.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DriverRepository])],
  providers: [DriverService],
  exports: [DriverService],
})
export class DriverModule {}
