import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { from, map, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserEntity } from '../user/entity/user.entity';
import { UserDto } from '../user/dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private userService: UserService,
  ) {}

  hashPassword(password: string): Observable<string> {
    const SALT = 10;
    return from(bcrypt.hash(password, SALT));
  }

  registerAccount(dto: UserDto): Observable<UserEntity> {
    const { firstName, lastName, email, password } = dto;

    return this.hashPassword(password).pipe(
      switchMap((hashPassword: string) => {
        return from(
          this.userService.createUser({
            firstName,
            lastName,
            email,
            password: hashPassword,
          }),
        ).pipe(
          map((user: UserEntity) => {
            return user;
          }),
        );
      }),
    );
  }
}
