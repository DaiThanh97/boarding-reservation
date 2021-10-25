import { MigrationInterface, QueryRunner } from 'typeorm';

export class seed1635168322952 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO driver(id, driverName, driverPhone, vehiclePlate) VALUES(0,'John', '0123456789', '59-Z1 123.45')`,
    );
    await queryRunner.query(
      `INSERT INTO driver(id, driverName, driverPhone, vehiclePlate) VALUES(0,'Ken', '0909123123', '59-L3 234.56')`,
    );
    await queryRunner.query(
      `INSERT INTO driver(id, driverName, driverPhone, vehiclePlate) VALUES(0,'Scott', '0289312312', '54-X7 902.12')`,
    );
    await queryRunner.query(
      `INSERT INTO driver(id, driverName, driverPhone, vehiclePlate) VALUES(0,'Billy', '0393123832', '51-T2 345.12')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM `driver` WHERE `driverName` = `John`');
    await queryRunner.query('DELETE FROM `driver` WHERE `driverName` = `Ken`');
    await queryRunner.query(
      'DELETE FROM `driver` WHERE `driverName` = `Scott`',
    );
    await queryRunner.query(
      'DELETE FROM `driver` WHERE `driverName` = `Billy`',
    );
  }
}
