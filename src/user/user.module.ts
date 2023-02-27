import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { SubordinateEntity } from '../subordinate/entity/subordinate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, SubordinateEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
