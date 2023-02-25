import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { from, map, Observable, of, tap } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserEntity } from '../user/entity/user.entity';
import { UserDto } from '../user/dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  hashPassword(password: string): Observable<string> {
    const SALT = 10;
    return from(bcrypt.hash(password, SALT));
  }

  doesUserExist(email: string): Observable<boolean> {
    return from(
      this.userRepository.findOne({
        where: [{ email }],
      }),
    ).pipe(
      switchMap((user: UserEntity) => {
        return of(!!user);
      }),
    );
  }

  registerAccount(user: UserDto): Observable<UserEntity> {
    const { firstName, lastName, email, password } = user;

    return this.doesUserExist(email).pipe(
      tap((doesUserExist: boolean) => {
        if (doesUserExist) {
          throw new HttpException(
            'A user has already been created with this email address',
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      switchMap(() => {
        return this.hashPassword(password).pipe(
          switchMap((hashedPassword: string) => {
            return from(
              this.userRepository.save({
                firstName,
                lastName,
                email,
                password: hashedPassword,
              }),
            ).pipe(
              map((user: UserEntity) => {
                delete user.password;
                return user;
              }),
            );
          }),
        );
      }),
    );
  }

  validate(email: string, password: string): Observable<UserEntity> {
    return from(
      this.userRepository.findOne({
        select: ['id', 'firstName', 'lastName', 'email', 'password', 'role'],
        where: [{ email }],
      }),
    ).pipe(
      switchMap((user: UserEntity) => {
        if (!user) {
          throw new HttpException(
            {
              status: HttpStatus.FORBIDDEN,
              error: 'Invalid credentials',
            },
            HttpStatus.FORBIDDEN,
          );
        }
        return from(bcrypt.compare(password, user.password)).pipe(
          map((isValidPassword: boolean) => {
            if (isValidPassword) {
              delete user.password;
              return user;
            }
          }),
        );
      }),
    );
  }

  login(user: UserDto): Observable<string> {
    const { email, password } = user;
    return this.validate(email, password).pipe(
      switchMap((user: UserEntity) => {
        if (user) {
          return from(this.jwtService.signAsync({ user }));
        }
      }),
    );
  }
}
