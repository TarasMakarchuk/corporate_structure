import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  readonly firstName: string;
  readonly lastName: string;
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly password: string;
}
