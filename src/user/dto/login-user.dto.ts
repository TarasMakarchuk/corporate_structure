import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'Email address' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '1234556', description: 'Password' })
  @IsString()
  readonly password: string;
}
