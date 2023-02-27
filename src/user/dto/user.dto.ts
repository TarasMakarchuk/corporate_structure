import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'John', description: 'First name' })
  readonly firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  readonly lastName: string;

  @ApiProperty({ example: 'example@gmail.com', description: 'Email address' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '1234556', description: 'Password' })
  @IsString()
  readonly password: string;
}
