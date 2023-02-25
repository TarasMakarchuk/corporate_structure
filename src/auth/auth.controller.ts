import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import { Observable } from 'rxjs';
import { UserEntity } from '../user/entity/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: UserDto): Observable<UserEntity> {
    return this.authService.registerAccount(dto);
  }
}
