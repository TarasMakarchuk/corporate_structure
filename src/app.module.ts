import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SubordinateModule } from './subordinate/subordinate.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    SubordinateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
