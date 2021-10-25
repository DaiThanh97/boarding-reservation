import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ENV_CONFIG, validate } from './configs/env';
import { createConnection, ConnectionOptions } from 'typeorm';
import { ReservationModule } from './reservation/reservation.module';
import { DriverModule } from './driver/driver.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ENV_CONFIG],
      isGlobal: true,
      cache: true,
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: !configService.get<string>('isProd'),
        logging: !configService.get<string>('isProd'),
        migrations: [__dirname + '/migration/**/*.{js,ts}'],
        retryAttempts: 3,
        retryDelay: 3000,
        cli: {
          entitiesDir: 'src/entity',
          migrationsDir: 'src/migration',
          subscribersDir: 'src/subscriber',
        },
      }),
      connectionFactory: async (options?: ConnectionOptions) => {
        console.log('Connecting to DB ...');
        const conn = options
          ? await createConnection(options)
          : await createConnection();
        const migrate = await conn.runMigrations();
        console.log('Connect to DB successfully ', migrate);
        return conn;
      },
    }),
    AuthModule,
    UsersModule,
    ReservationModule,
    DriverModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
