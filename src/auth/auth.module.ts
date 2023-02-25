import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
