import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt/jwt.guard';
import { JwtStrategy } from './guards/jwt/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '365d',
        },
      }),
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [AuthService, UserService, JwtGuard, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
