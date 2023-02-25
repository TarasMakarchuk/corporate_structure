import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import { map, Observable } from 'rxjs';
import { UserEntity } from '../user/entity/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: UserDto): Observable<UserEntity> {
    return this.authService.registerAccount(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: UserDto): Observable<{ token: string }> {
    return this.authService
      .login(dto)
      .pipe(map((jwt: string) => ({ token: jwt })));
  }
}
