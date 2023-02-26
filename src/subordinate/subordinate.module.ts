import { Module } from '@nestjs/common';
import { SubordinateController } from './subordinate.controller';
import { SubordinateService } from './subordinate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubordinateEntity } from './entity/subordinate.entity';
import { UserEntity } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubordinateEntity, UserEntity])],
  controllers: [SubordinateController],
  providers: [SubordinateService, UserService],
})
export class SubordinateModule {}
