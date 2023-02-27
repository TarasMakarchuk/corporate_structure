import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import { map, Observable } from 'rxjs';
import { UserEntity } from '../user/entity/user.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization, authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "Create a new user's account" })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserEntity })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: UserDto): Observable<UserEntity> {
    return this.authService.registerAccount(dto);
  }

  @ApiOperation({ summary: 'Login to account' })
  @ApiResponse({ status: HttpStatus.OK, type: UserEntity })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: LoginUserDto): Observable<{ token: string }> {
    return this.authService
      .login(dto)
      .pipe(map((jwt: string) => ({ token: jwt })));
  }
}
